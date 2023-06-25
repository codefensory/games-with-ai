// 1 es para el player
// 2 es para la meta
// -1 es para los bloques
function parseTableValue(value: number) {
  if (value === 1) {
    return "player";
  }

  if (value === 2) {
    return "end";
  }

  if (value === -1) {
    return "block";
  }

  return "none";
}

const DISCOUNT = 0.9;
const LEARNING_RATE = 0.1;
const LEARNING_RATE_AI = 0.1;

function qTargetUpdate(qValue: number, reward: number, maxNextQValue: number) {
  return qValue + LEARNING_RATE * (reward + DISCOUNT * maxNextQValue - qValue);
}

const handlerPlay = async () => {
  setBlockButton(true);

  let step = 0;

  let maxStep = 5000;

  let totalReward = 0;

  let ctable = [...table];

  while (step < maxStep) {
    console.log(table);

    console.log("step:", step);

    step++;

    await new Promise((resolve) => {
      setTimeout(() => requestAnimationFrame(resolve), 100);
    });

    const currentQ = execute(table);

    let qActionMax = -Number.MAX_VALUE;

    let qActionMaxIndex = -1;

    for (let i = 0; i < currentQ.length; i++) {
      const value = currentQ[i];

      if (value > qActionMax) {
        qActionMax = value;

        qActionMaxIndex = i;
      }
    }

    const moveEnv = move(qActionMaxIndex);

    const targetQ = [...currentQ];

    if (!moveEnv) {
      targetQ[qActionMaxIndex] -= LEARNING_RATE_AI * 100;

      totalReward -= 100;

      await learn(table, targetQ);

      continue;
    }

    const { r, ns } = moveEnv;

    const maxNextQAction = Math.max(...execute(ns));

    const newQAction = qTargetUpdate(qActionMax, r, maxNextQAction);

    targetQ[qActionMaxIndex] = LEARNING_RATE_AI * (newQAction - qActionMax);

    await learn(table, targetQ);

    totalReward += r;

    // Esto es cuando GANA!
    if (r === 100) {
      reset();

      console.log(totalReward);

      totalReward = 0;
    }
  }

  setBlockButton(false);
};
