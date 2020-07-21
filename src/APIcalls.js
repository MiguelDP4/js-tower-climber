import "regenerator-runtime/runtime.js";

export const APIcalls = (() => {
  const saveScore = async (user, score) => {
    let apiCall = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/pK1jIuamYmYoJkVVG3hS/scores/";
    let sendingScore = `{"user":"${user}","score":"${score}"}`;
    const apiData = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: sendingScore,
    };
    const savePromise = new Promise ((resolve, reject) => {
      fetch(apiCall, apiData)
      .then(function(response){
        if(response.status === 201){
          resolve(response);
        } else {
          resolve("something went wrong");
        }
      })
      .catch(function(error){
        reject(error);
      });
    });
    return savePromise;
  }

  const getHighestScores = () => {
    let apiCall = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/pK1jIuamYmYoJkVVG3hS/scores/";
    const scoresPromise = new Promise ((resolve, reject) => {
      fetch(apiCall)
      .then(function(response) {
        if(response.status === 200){
          resolve(response.json());
        } else{
          resolve("something went wrong");
        }          
      })
      .catch(function(error){
        reject(error);
      });
    });
    return scoresPromise;
  }

  return {
    saveScore,
    getHighestScores
  };
})();

export default APIcalls;