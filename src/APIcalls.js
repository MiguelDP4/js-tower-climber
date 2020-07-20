import 'regenerator-runtime/runtime';

export const APIcalls = (() => {
  const saveScore = async (user, score) => {
    const apiCall = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/pK1jIuamYmYoJkVVG3hS/scores/';
    const sendingScore = `{"user":"${user}","score":"${score}"}`;
    const apiData = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: sendingScore,
    };
    const savePromise = new Promise((resolve, reject) => {
      fetch(apiCall, apiData)
        .then((response) => {
          if (response.status === 201) {
            resolve(response);
          } else {
            resolve('something went wrong');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
    return savePromise;
  };

  const getHighestScores = () => {
    const apiCall = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/pK1jIuamYmYoJkVVG3hS/scores/';
    const scoresPromise = new Promise((resolve, reject) => {
      fetch(apiCall)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.json());
          } else {
            resolve('something went wrong');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
    return scoresPromise;
  };

  return {
    saveScore,
    getHighestScores,
  };
})();

export default APIcalls;