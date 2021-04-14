
const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");
//load healthData training and testing data
const  healthData= require("../../data/processed-cleveland.json");
const testData = require("../../data/testData.json")



var lossValue;
//
exports.trainAndPredict = function (req, res) {
  //console.log(healthData);

  //
  // convert/setup our data for tensorflow.js
  //
  //tensor of features for training data
  const trainingData = tf.tensor2d(
    healthData.map((item) => [
      item.sex,
      item.age,
      item.cp,
      item.trestbps,
      item.chol,
      item.fbs,
      item.restecg,
      item.thalach,
      item.exang,
      item.oldpeak,
      item.slope,
      item.ca,
      item.thal,
    ])
  );

  //tensor of output for training data


  const outputData = tf.tensor2d(
    // Experiments with the Cleveland database have concentrated on simply attempting to distinguish presence (values 0,1,2,3,4) from absence (value 0).
    healthData.map((item) => [
      item.riskCategory === 0 ? 1 : 0,
      item.riskCategory === 1 ? 1 : 0,
      item.riskCategory === 2 ? 1 : 0,
      item.riskCategory === 3 ? 1 : 0,
      item.riskCategory === 4 ? 1 : 0,
    ])
  );

  //
  //tensor of features for testing data
  //the testing data  will be front the user input via react. Will use the request and pass in the health values that we want to see if it can match a preidiction.
  const testingData = tf.tensor2d(
    
    //use testData for local test
    [req.body].map((item) => [
      //note 1 is male, 0 is 
      
      Number(item.sex),
      Number(item.age),
      Number(item.cp),
      Number(item.trestbps),
      Number(item.chol),
      Number(item.fbs),
      Number(item.restecg),
      Number(item.thalach),
      Number(item.exang),
      Number(item.oldpeak),
      Number(item.slope),
      Number(item.ca),
      Number(item.thal),
     
  
    ])
    
  );
 
  console.log("training Data:"+ trainingData);
  console.log("testing Data:"+testingData);
  console.log("output data:"+outputData);
 

  // build neural network using a sequential model
  const model = tf.sequential();
  //add the first layer
  model.add(
    tf.layers.dense({
      inputShape: [13], // 13 initial neurons
      activation: "sigmoid",
      units: 15, //dimension of output space (first hidden layer)
    })
  );
  //add the hidden layer
  model.add(
    tf.layers.dense({
      inputShape: [9], //dimension of hidden layer
      activation: "sigmoid",
      units: 9, //dimension of final output
    })
  );
  
  //add output layer
  model.add(
    tf.layers.dense({
      activation: "sigmoid",
      units: 5, //dimension of final output
    })
  );
  //softmax the output to only have the highest match 



  //compile the model with an MSE loss function and Adam algorithm
  model.compile({
    loss: "meanSquaredError",
    optimizer: tf.train.adam(0.006),
  });

  console.log("Summary:"+model.summary());

  //train the model and predic

  async function run() {
    const startTime = Date.now();
   
    await model.fit(trainingData, outputData, {
      epochs: 100,
      callbacks: {
        onEpochEnd: async (epochs, log) => {
          lossValue = log.loss;
          console.log(`epoch ${epochs}; lossValue = ${log.loss}`);
          elapsedTime = Date.now() - startTime;
          console.log("elapsed time: " + elapsedTime);
         
        },
      },
    });
    const results = model.predict(testingData);
  

    results.array().then((array) => {

  
      console.log(array[0][0]);
      var resultForData1 = array[0];
      var resultForData2 = array[1];
      var resultForData3 = array[2];
    

      var dataToSend = {
        row1: resultForData1,
     
      
      };
 
 
      console.log(dataToSend);
     
      res.status(200).send(dataToSend);
      /*
      res.render("results", {
        elapsedTime: elapsedTime / 1000,
        lossValue: lossValue,
        resultForData1: resultForData1[0],
        resultForData2: resultForData2,
        resultForData3: resultForData3,
      });*/
    });
  } //end of the function
  run();

  /////////////////////////////
};


// Create a new render method to render index.ejs

exports.render = function (req, res) {
  //display index.ejs
  res.render("index");
};
