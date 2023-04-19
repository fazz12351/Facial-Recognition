				   /*
					Data and machine learning for artistic practice
					Week 3

					Facial detection on a webcam

				  */
				   //these are our global variables,objects arrays. We have kept them as our global variables as we will need them for many different functions across our programme.
				   let faceapi,
				   	video,
				   	detections,
					   
					   
				   	TrainingMode,
				   	InPosition,
				   	CheckPoint,
				   	CheckPoint1,
				   	CheckPoint2,
				   	CheckPoint3,
				   	CheckPoint4,
				   	CheckPoint5,
				   	PicUnPicLocked,
				   	PicLocked,
				   	UserIdentified = false,
				   	DeviceLocked = true,
				   	clowImageDisplay = false,


				   	//this object is to store the values (distance) between the mouht nad different point of the face such as: we store the distance between the mouth and the nose. We intake 3 point for better accuracy.

				   	//Furthermore, we also work out the distance between the mouth adn they eyes, and mouth to eyebrows. Similarly to the "mouthToNose function, we stroe 3 distances between the 3 landmarks. This is used to train our model.
				   	AuthorisedUserObj = {
				   		MouthToNose: {
				   			//these work out the point from 3 different landmarks on the mouth to the nose(3 different landmarks on the nose)
				   			Point1: 0,
				   			Point2: 0,
				   			Point3: 0
				   		},
				   		MouthToEyes: {
				   			//Similarly to above, however, we have the Lpoint for left eye and Rpoints for the right eye.
				   			LPoint1: 0,
				   			LPoint2: 0,
				   			LPoint3: 0,
				   			RPoint1: 0,
				   			RPoint2: 0,
				   			RPoint3: 0
				   		},
				   		MouthToEyeBrows: {
				   			//Similarly to above, however, we have the Lpoint for left eyeBrow and Rpoints for the right eyeBrow.
				   			LPoint1: 0,
				   			LPoint2: 0,
				   			LPoint3: 0,
				   			RPoint1: 0,
				   			RPoint2: 0,
				   			RPoint3: 0
				   		},
				   		Checker: {
				   			//these local variables are used to store the current state of function. Forexample, if we identify the distance for each point for the "mouthToNose", the bool "MouthToNoseChecker" will return true. this is the same as all the other bools below.
				   			MouthToNoseChecker: false,
				   			MouthToLEyes: false,
				   			MouthToREyes: false,
				   			MouthToLEyeBrows: false,
				   			MouthToREyeBrows: false
				   		}

				   	},

				   	//Similalry to the above object, we also store the current landmarks of the detected face. Hover, the previous object will only be called once and the data will be stored permantely to allow us to compare between the 2 object. The UnAuthorisedUserObj is called perframe which stores the distance as before, however, its updated meaning different detections can be used to copare between our trained model to our current model.

				   	UnAuthorisedUserObj = {
				   		MouthToNose: {
				   			Point1: 0,
				   			Point2: 0,
				   			Point3: 0
				   		},
				   		MouthToEyes: {
				   			LPoint1: 0,
				   			LPoint2: 0,
				   			LPoint3: 0,
				   			RPoint1: 0,
				   			RPoint2: 0,
				   			RPoint3: 0
				   		},
				   		MouthToEyeBrows: {
				   			LPoint1: 0,
				   			LPoint2: 0,
				   			LPoint3: 0,
				   			RPoint1: 0,
				   			RPoint2: 0,
				   			RPoint3: 0
				   		},
				   		Checker: {
				   			MouthToNoseChecker: false,
				   			MouthToLEyes: false,
				   			MouthToREyes: false,
				   			MouthToLEyeBrows: false,
				   			MouthToREyeBrows: false
				   		}

				   	},
				   	//these timers are used to store the time period it takes to push data into our object.
				   	Timer1 = 0,
				   	Timer2 = 0,
				   	Timer3 = 0,
				   	Timer4 = 0,
				   	Timer5 = 0,
				   	//sceneCounter is used to mnage between the different animations. FEEL FREE TO USE THIS TO MANIPULATE BETWEEN SCENES!
				   	SceneCounter = 0,
				   	//this is for the 3rd animation in our Educate class. controls the drift of the "Neural Netwrks" across the canvas.
				   	drift = 0;


				   // these are our options for detecting faces, provided by ml5.js
				   const detection_options = {
				   	withLandmarks: true,
				   	withDescriptors: false,
				   }

				   //Preload function called so its calls all our assstes before the programe is called making sure its ready for work.
				   function preload() {
				   	PicLocked = loadImage('assets/locked.jpeg');
				   	PicUnPicLocked = loadImage('assets/unlocked.jpeg');
				   	PicClown = loadImage('assets/clown.jpeg');
				   	PicSheldon = loadImage('assets/sheldon.png');
				   	PicNeauralNetwork = loadImage('assets/NN.jpeg');
				   	PicDownArrowImage = loadImage('assets/arrow.jpg');
				   }

				   //we create an instance of Biometric system and create an object called a. We also call the objects method called setup in the setup functions.
				   function setup() {
				   	a = new BiometricSystem();
				   	a.setup();
				   }
				   //this calls the webcam method
				   function webcamReady(stream) {
				   	a.webcamReady(stream);

				   }

				   //we create an instance of the biometricsystem called a and another object of our class Educate called b
				   function draw() {
				   	a = new BiometricSystem();
				   	b = new Educate();

				   	//The Scenecounter variable is used to manipulate between diffrent animatiion and events.

				   	if (SceneCounter == 0) {
				   		a.intro();
				   	}
				   	if (SceneCounter == 1) {
				   		a.draw();
				   	}
				   	if (SceneCounter == 2 && UserIdentified) {
				   		b.setup();
				   	}
					   
					   console.log(UnAuthorisedUserObj)

				   }


				   function keyPressed() {
				   	//when the user presses the up arrow, the value of SceneCounter incrementds. Meaning when the user presses the up arrown, we move between different pages.
				   	if (keyCode == UP_ARROW) {
				   		SceneCounter += 1;
				   	}
				   	//similarly to above, used to manipulate down between pages(previous);
				   	if (keyCode == DOWN_ARROW) {
				   		SceneCounter -= 1;
				   	}
				   }


				   // callback for when ml5.js has loaded the model
				   function modelReady() {
				   	a.modelReady();
				   }

				   // ml5.js has determined if there's a face
				   function gotResults(err, result) {
				   	// check if ml5.js returned an error - if so print to console and stop
				   	if (err) {
				   		console.log(err)
				   		return
				   	}

				   	// if it gets here we are okay, so store results in the detections variable, this is an OBJECT of detections - see the console
				   	//console.log(result);
				   	detections = result;

				   	// we recursively call face detect
				   	faceapi.detect(gotResults)

				   }


				   // *** Draw our elements on the image, a box and face feature locations ***  
				   function drawBox(detections) {
				   	a.drawBox(detections);

				   }

				   //draw our landmarksa

				   function drawLandmarks(detections) {
				   	a.drawLandmarks(detections);


				   }



				   //this class is used to create our biometric system. It manages all the functionality needed to programme our system.
				   function BiometricSystem() {

				   	this.setup = function () {
				   		createCanvas(600, 338); // I use these to downsize a 720p stream, but you can adjust for your webcam if it skews it.

				   		// ask for webcam access - with webcamReady() callback for when we have access
				   		video = createCapture(VIDEO, webcamReady);
				   		video.size(width, height); // set size to be equal to canvas
				   		video.hide(); // hide DOM element
				   		//TrainingMode bool is used to control the bhaviour our our detections. When the bool is true, we will allow the system to store the authorised users landmark distance in our object called AuthorisedUserObj. Data is only stored on this object when training mode is true. 
				   		TrainingMode = true;
				   		AuthorisedMode = false;
				   		InPosition = false;
				   		DeviceLocked = true



				   	}

				   	this.webcamReady = function (stream) {
				   		// load the faceapi model - with modelReady() callback
				   		// - NOTE: this time we provide video as the first parameter
				   		faceapi = ml5.faceApi(video, detection_options, modelReady)

				   	}
				   	this.intro = function () {
				   		//this is the first animation we see in SceneCounter1(Welcome Page); We use a loop to draw random dark ellipse across the canvas. When a significant amount ks drawn, The white letters will become more visible to the nakes eye.
				   		if (SceneCounter == 0) {
				   			for (var i = 0; i < width; i++) {

				   				push();
				   				ellipse(random(i), random(i), 2);
				   				pop();

				   				push();
				   				fill(255);
				   				textSize(20)
				   				posX = width / 2 - 50;
				   				posY = height / 2 - 50
				   				text("Welcome", posX, posY - 20)
				   				text("This application is built to bring awareness on how Biometric", 20, posY + 20)
				   				text("System works and provide 1 to 1 illustrations for better understanding ", 20, posY + 40)
				   				text("Press Up Arrow to continue ", posX + 40, height - 40)
				   				pop();
				   			}
				   		}
				   	}

				   	this.draw = function () {
				   		//this function is used to call all our methods needed for our biometric system. Its the power source to pur application.

				   		background(0);

				   		// draw picture
				   		image(video, 0, 0, width, height)

				   		// if we have detections, draw them on the image
				   		if (detections) {
				   			// when we call detect, we are looking for potentially multiple faces, so ml5.js returns an array of objects, therefore here we use a for loop to get each 'person'.
				   			for (let person of detections) {
				   				drawBox(person);
				   				drawLandmarks(person);
				   			}
				   		}


				   		//this method is used to add filter over out video feed
				   		this.filter();
				   		//this method checks if the devicde is locked or not
				   		this.DeviceLockChecker();
				   		//this checks for keyress event.Button Listener
				   		this.KeyPressedEvents();




				   	}
				   	this.modelReady = function () {
				   		console.log("Model is ready...");

				   		// ask ml5 to detect a faces in the video stream previously provided - gotResults() callback
				   		faceapi.detect(gotResults);

				   	}


				   	this.drawBox = function (detections) {
				   		//this draws the boxacross our face when detected.
				   		push();
				   		const alignedRect = detections.alignedRect;
				   		const {
				   			_x,
				   			_y,
				   			_width,
				   			_height
				   		} = alignedRect._box;
				   		noFill();
				   		stroke(161, 95, 251);
				   		strokeWeight(2)
				   		rect(_x, _y, _width, _height)

				   		//this conditions checks if the bos around our face when detected is in the same posisiotn as the static box drawn on the canvas. We also make sure we check the width of both adnensure they are the same. This is to ensure that when we compare betwee nour trained and current model, we have valid data from good test. We need to compare landmarks from the same face position. Different positions will result into different resuly. Forexample, if i was to move further away from the static position, the distance between the nose and mouth will be less. When comparing to our trained mode, our result will show its isnt the same person as the data doesnt match. The box is used for guide for accurate data. When all conditions are met, we set the bool Inposition to true which allows other function to begin like a domino affect.
				   		if (_x >= 199 && _x <= 400 && _y >= 69 && _y <= 271) {
				   			if (_width >= 190 && _width <= 205) {
				   				stroke(0, 255, 0);
				   				InPosition = true;
				   			}

				   		}
				   		//when the users doesnt meet hte terms above(out of range from the sstatic box, we set the bool Inposition to false meaning the other fucntion cannot be called)
				   		if (_width <= 195 || _width >= 205 || _x <= 199 && _x >= 400 && _y <= 69 && _y >= 271) {
				   			stroke(255, 0, 0);
				   			InPosition = false;
				   		}


				   		//this draws the text and static box every frame allowing the user to position hte face ion the correct location.
				   		textSize(15);
				   		text("Posision Face In Here!", width / 2 - 70, height / 2 - 50)
				   		rect(width / 2 - 100, height / 2 - 100, 200, 200);
				   		fill(0, 255, 0);
				   		stroke(0, 0, 255)
				   		ellipse(width / 2, height / 2, 10, 10)
				   		pop();


				   	}
				   	this.drawLandmarks = function (detections) {
				   		//this method is used to calculate wetwween the Authorised User object and Unauthorised object.
				   		this.DistanceCalculatorForAU(detections);


				   		noFill();
				   		stroke(161, 95, 251);
				   		strokeWeight(2)

				   		push()
				   		// mouth
				   		beginShape(POINTS);
				   		detections.parts.mouth.forEach(item => {
				   			vertex(item._x, item._y);

				   		})
				   		endShape(CLOSE);

				   		// nose
				   		beginShape(POINTS);
				   		detections.parts.nose.forEach(item => {
				   			vertex(item._x, item._y)
				   		})
				   		endShape(CLOSE);

				   		// left eye
				   		beginShape(POINTS);
				   		detections.parts.leftEye.forEach(item => {
				   			vertex(item._x, item._y)
				   		})
				   		endShape(CLOSE);

				   		// right eye
				   		beginShape(POINTS);
				   		detections.parts.rightEye.forEach(item => {
				   			vertex(item._x, item._y)
				   		})
				   		endShape(CLOSE);

				   		// right eyebrow
				   		beginShape(POINTS);
				   		detections.parts.rightEyeBrow.forEach(item => {
				   			vertex(item._x, item._y)
				   		})
				   		endShape();

				   		// left eye
				   		beginShape(POINTS);
				   		detections.parts.leftEyeBrow.forEach(item => {
				   			vertex(item._x, item._y)
				   		})
				   		endShape();

				   		pop();




				   	}
				   	this.DistanceCalculatorForAU = function (detections) {
				   		//this is used to figure out the distance between the mouth and other parts of the face detected in detections.


				   		//As previously mentioned, the Inposition bool needs to be true inorder for other operation to be called. When true and key 1 is pressed, we can execute the calculation functiong.
				   		if (InPosition == true && keyCode == 49) {
				   			//this calculation function works the distance between 3 points from the mouth to ther parts. This is a global loop allowing other nested loop to comare between the parts.
				   			for (let i = 0; i < detections.parts.mouth.length; i++) {


				   				//this loop compares 3 points from the mouth to rhe nose. 
				   				for (let j = 0; j < detections.parts.nose.length; j++) {
				   					//we create a local varable which allows us to reduce the time needed to shpow the path to our object array.
				   					let LandmarksForMouth = detections.parts.mouth;
				   					let LandMarksForNose = detections.parts.nose;
				   					//we work our the distance between each elemtns and store in in alphabetic order.
				   					a = dist(LandmarksForMouth[6]._x, LandmarksForMouth[6]._y, LandMarksForNose[6]._x, LandMarksForNose[6]._y);
				   					b = dist(LandmarksForMouth[0]._x, LandmarksForMouth[0]._y, LandMarksForNose[0]._x, LandMarksForNose[0]._y);
				   					c = dist(LandmarksForMouth[3]._x, LandmarksForMouth[3]._y, LandMarksForNose[0]._x, LandMarksForNose[0]._y);

				   					//this draws the line from each point selevtec above for better demonsration.
				   					stroke(255, 0, 0);
				   					line(LandmarksForMouth[0]._x, LandmarksForMouth[0]._y, LandMarksForNose[0]._x, LandMarksForNose[0]._y);
				   					line(LandmarksForMouth[6]._x, LandmarksForMouth[6]._y, LandMarksForNose[0]._x, LandMarksForNose[0]._y);
				   					line(LandmarksForMouth[3]._x, LandmarksForMouth[3]._y, LandMarksForNose[0]._x, LandMarksForNose[0]._y);

				   					//when training mode is true, we store the distance into our AuthorisedUserObj object. Weh nthe bool is false, n odata is pushed into the object.
				   					if (TrainingMode == true) {
				   						Timer1 += 1
				   						if (Timer1 <= 2.5 / 2) {

				   							AuthorisedUserObj.MouthToNose.Point1 = int(a);
				   							AuthorisedUserObj.MouthToNose.Point2 = int(b);
				   							AuthorisedUserObj.MouthToNose.Point3 = int(c);
				   							AuthorisedUserObj.Checker.MouthToNoseChecker = true;
				   						}
				   					} else {
				   						//if training mode == false, we push the distance (a,b,c) intro LDFUnauthorised. This will be pushed every frame to compared between the authorised user and the unauthorised user.
				   						UnAuthorisedUserObj.MouthToNose.Point1 = int(a);
				   						UnAuthorisedUserObj.MouthToNose.Point2 = int(b);
				   						UnAuthorisedUserObj.MouthToNose.Point3 = int(c);
				   						UnAuthorisedUserObj.Checker.MouthToNoseChecker = true;


				   					}

				   					//i have create a function which works out the distance between the same points, RAngeChecker(part1,part2), takes 2 parameters and checks iof the value are approximately same(give or take 4 pixels);. We return true if the conditions are met. When all functions return true, we stroe the result into test1,2,and 3. When all 3 have been checked using the range checker method, we return true or fdalse to our first checkpoint.

				   					let test = RangeChecker(AuthorisedUserObj.MouthToNose.Point1, UnAuthorisedUserObj.MouthToNose.Point1);
				   					let test1 = RangeChecker(AuthorisedUserObj.MouthToNose.Point2, UnAuthorisedUserObj.MouthToNose.Point2);
				   					let test2 = RangeChecker(AuthorisedUserObj.MouthToNose.Point3, UnAuthorisedUserObj.MouthToNose.Point3);

				   					if (test == true && test1 == true && test2 == true) {
				   						CheckPoint = true;
				   					} else {
				   						CheckPoint = false;
				   					}



				   				}


				   				//similary to above,we do the same method, we work out the dtiance from different part to the mouth and we use the range checker function to test the range. If both are true, we returen each checkpoint to true.


				   				for (let u = 0; u < detections.parts.leftEye.length; u++) {
				   					let LandmarksForMouth = detections.parts.mouth;
				   					let LandMarksForLeftEye = detections.parts.leftEye;
				   					d = dist(LandmarksForMouth[6]._x, LandmarksForMouth[6]._y, LandMarksForLeftEye[2]._x, LandMarksForLeftEye[2]._y);
				   					e = dist(LandmarksForMouth[0]._x, LandmarksForMouth[0]._y, LandMarksForLeftEye[0]._x, LandMarksForLeftEye[0]._y);
				   					f = dist(LandmarksForMouth[3]._x, LandmarksForMouth[3]._y, LandMarksForLeftEye[0]._x, LandMarksForLeftEye[0]._y);

				   					stroke(0, 255, 0);
				   					line(LandmarksForMouth[6]._x, LandmarksForMouth[6]._y, LandMarksForLeftEye[2]._x, LandMarksForLeftEye[2]._y);
				   					line(LandmarksForMouth[0]._x, LandmarksForMouth[0]._y, LandMarksForLeftEye[0]._x, LandMarksForLeftEye[0]._y);
				   					line(LandmarksForMouth[3]._x, LandmarksForMouth[3]._y, LandMarksForLeftEye[0]._x, LandMarksForLeftEye[0]._y);


				   					if (TrainingMode == true) {
				   						Timer2 += 1
				   						if (Timer2 <= 2.5 / 2) {

				   							AuthorisedUserObj.MouthToEyes.LPoint1 = d;
				   							AuthorisedUserObj.MouthToEyes.LPoint2 = e;
				   							AuthorisedUserObj.MouthToEyes.LPoint3 = f;
				   							AuthorisedUserObj.Checker.MouthToLEyes = true;


				   						}
				   					} else {
				   						UnAuthorisedUserObj.MouthToEyes.LPoint1 = d;
				   						UnAuthorisedUserObj.MouthToEyes.LPoint2 = e;
				   						UnAuthorisedUserObj.MouthToEyes.LPoint3 = f;
				   						UnAuthorisedUserObj.Checker.MouthToLEyes = true;

				   					}

				   					let test = RangeChecker(AuthorisedUserObj.MouthToEyes.LPoint1, UnAuthorisedUserObj.MouthToEyes.LPoint1);
				   					let test1 = RangeChecker(AuthorisedUserObj.MouthToEyes.LPoint2, UnAuthorisedUserObj.MouthToEyes.LPoint2);
				   					let test2 = RangeChecker(AuthorisedUserObj.MouthToEyes.LPoint3, UnAuthorisedUserObj.MouthToEyes.LPoint3);

				   					if (test == true && test1 == true && test2 == true) {
				   						CheckPoint1 = true;
				   					} else {
				   						CheckPoint1 = false;
				   					}

				   				}




				   				//similary to above,we do the same method, we work out the dtiance from different part to the mouth and we use the range checker function to test the range. If both are true, we returen each checkpoint to true.


				   				for (let t = 0; t < detections.parts.rightEye.length; t++) {
				   					let LandmarksForMouth = detections.parts.mouth;
				   					let LandMarksForRightEye = detections.parts.rightEye;
				   					g = dist(LandmarksForMouth[6]._x, LandmarksForMouth[6]._y, LandMarksForRightEye[2]._x, LandMarksForRightEye[2]._y);
				   					h = dist(LandmarksForMouth[0]._x, LandmarksForMouth[0]._y, LandMarksForRightEye[0]._x, LandMarksForRightEye[0]._y);
				   					i = dist(LandmarksForMouth[3]._x, LandmarksForMouth[3]._y, LandMarksForRightEye[0]._x, LandMarksForRightEye[0]._y);

				   					stroke(0, 0, 255);
				   					line(LandmarksForMouth[6]._x, LandmarksForMouth[6]._y, LandMarksForRightEye[2]._x, LandMarksForRightEye[2]._y);
				   					line(LandmarksForMouth[0]._x, LandmarksForMouth[0]._y, LandMarksForRightEye[0]._x, LandMarksForRightEye[0]._y);
				   					line(LandmarksForMouth[3]._x, LandmarksForMouth[3]._y, LandMarksForRightEye[0]._x, LandMarksForRightEye[0]._y);


				   					if (TrainingMode == true) {
				   						Timer3 += 1
				   						if (Timer3 <= 2.5 / 2) {
				   							AuthorisedUserObj.MouthToEyes.RPoint1 = g;
				   							AuthorisedUserObj.MouthToEyes.RPoint2 = h;
				   							AuthorisedUserObj.MouthToEyes.RPoint3 = i;
				   							AuthorisedUserObj.Checker.MouthToREyes = true;

				   						}
				   					} else {
				   						UnAuthorisedUserObj.MouthToEyes.RPoint1 = g;
				   						UnAuthorisedUserObj.MouthToEyes.RPoint2 = h;
				   						UnAuthorisedUserObj.MouthToEyes.RPoint3 = i;
				   						UnAuthorisedUserObj.Checker.MouthToREyes = true;

				   					}
				   					let test = RangeChecker(AuthorisedUserObj.MouthToEyes.RPoint1, UnAuthorisedUserObj.MouthToEyes.RPoint1);
				   					let test1 = RangeChecker(AuthorisedUserObj.MouthToEyes.RPoint2, UnAuthorisedUserObj.MouthToEyes.RPoint2);
				   					let test2 = RangeChecker(AuthorisedUserObj.MouthToEyes.RPoint3, UnAuthorisedUserObj.MouthToEyes.RPoint3);

				   					if (test == true && test1 == true && test2 == true) {
				   						CheckPoint2 = true;
				   					} else {
				   						CheckPoint2 = false;
				   					}


				   				}

				   				//similary to above,we do the same method, we work out the dtiance from different part to the mouth and we use the range checker function to test the range. If both are true, we returen each checkpoint to true.

				   				for (let l = 0; l < detections.parts.rightEyeBrow.length; l++) {
				   					let LandmarksForMouth = detections.parts.mouth;
				   					let LandMarksForRightEyeBrow = detections.parts.rightEyeBrow;
				   					j = dist(LandmarksForMouth[6]._x, LandmarksForMouth[6]._y, LandMarksForRightEyeBrow[2]._x, LandMarksForRightEyeBrow[2]._y);
				   					k = dist(LandmarksForMouth[0]._x, LandmarksForMouth[0]._y, LandMarksForRightEyeBrow[0]._x, LandMarksForRightEyeBrow[0]._y);
				   					l = dist(LandmarksForMouth[3]._x, LandmarksForMouth[3]._y, LandMarksForRightEyeBrow[0]._x, LandMarksForRightEyeBrow[0]._y);

				   					stroke(255);
				   					line(LandmarksForMouth[6]._x, LandmarksForMouth[6]._y, LandMarksForRightEyeBrow[2]._x, LandMarksForRightEyeBrow[2]._y);
				   					line(LandmarksForMouth[0]._x, LandmarksForMouth[0]._y, LandMarksForRightEyeBrow[0]._x, LandMarksForRightEyeBrow[0]._y);
				   					line(LandmarksForMouth[3]._x, LandmarksForMouth[3]._y, LandMarksForRightEyeBrow[0]._x, LandMarksForRightEyeBrow[0]._y);


				   					if (TrainingMode == true) {
				   						Timer4 += 1
				   						if (Timer4 <= 2.5 / 2) {

				   							AuthorisedUserObj.MouthToEyeBrows.RPoint1 = j;
				   							AuthorisedUserObj.MouthToEyeBrows.RPoint2 = k;
				   							AuthorisedUserObj.MouthToEyeBrows.RPoint3 = l;
				   							AuthorisedUserObj.Checker.MouthToREyeBrows = true;

				   						}
				   					} else {
				   						UnAuthorisedUserObj.MouthToEyeBrows.RPoint1 = j;
				   						UnAuthorisedUserObj.MouthToEyeBrows.RPoint2 = k;
				   						UnAuthorisedUserObj.MouthToEyeBrows.RPoint3 = l;
				   						UnAuthorisedUserObj.Checker.MouthToREyeBrows = true;
				   					}

				   					let test = RangeChecker(AuthorisedUserObj.MouthToEyeBrows.RPoint1, UnAuthorisedUserObj.MouthToEyeBrows.RPoint1);
				   					let test1 = RangeChecker(AuthorisedUserObj.MouthToEyeBrows.RPoint2, UnAuthorisedUserObj.MouthToEyeBrows.RPoint2);
				   					let test2 = RangeChecker(AuthorisedUserObj.MouthToEyeBrows.RPoint3, UnAuthorisedUserObj.MouthToEyeBrows.RPoint3);

				   					if (test == true && test1 == true && test2 == true) {
				   						CheckPoint3 = true;
				   					} else {
				   						CheckPoint3 = false;
				   					}




				   				}
				   				//similary to above,we do the same method, we work out the dtiance from different part to the mouth and we use the range checker function to test the range. If both are true, we returen each checkpoint to true.

				   				for (let a = 0; a < detections.parts.leftEyeBrow.length; a++) {
				   					let LandmarksForMouth = detections.parts.mouth;
				   					let LandMarksForLeftEyeBrow = detections.parts.leftEyeBrow;

				   					m = dist(LandmarksForMouth[6]._x, LandmarksForMouth[6]._y, LandMarksForLeftEyeBrow[2]._x, LandMarksForLeftEyeBrow[2]._y);
				   					n = dist(LandmarksForMouth[0]._x, LandmarksForMouth[0]._y, LandMarksForLeftEyeBrow[0]._x, LandMarksForLeftEyeBrow[0]._y);
				   					o = dist(LandmarksForMouth[3]._x, LandmarksForMouth[3]._y, LandMarksForLeftEyeBrow[0]._x, LandMarksForLeftEyeBrow[0]._y);

				   					stroke(150);
				   					line(LandmarksForMouth[6]._x, LandmarksForMouth[6]._y, LandMarksForLeftEyeBrow[2]._x, LandMarksForLeftEyeBrow[2]._y);
				   					line(LandmarksForMouth[0]._x, LandmarksForMouth[0]._y, LandMarksForLeftEyeBrow[0]._x, LandMarksForLeftEyeBrow[0]._y);
				   					line(LandmarksForMouth[3]._x, LandmarksForMouth[3]._y, LandMarksForLeftEyeBrow[0]._x, LandMarksForLeftEyeBrow[0]._y);


				   					if (TrainingMode == true) {
				   						Timer5 += 1
				   						if (Timer5 <= 2.5 / 2) {
				   							AuthorisedUserObj.MouthToEyeBrows.LPoint1 = m;
				   							AuthorisedUserObj.MouthToEyeBrows.LPoint2 = n;
				   							AuthorisedUserObj.MouthToEyeBrows.LPoint3 = o;
				   							AuthorisedUserObj.Checker.MouthToLEyeBrows = true;


				   						}
				   					} else {
				   						UnAuthorisedUserObj.MouthToEyeBrows.LPoint1 = m;
				   						UnAuthorisedUserObj.MouthToEyeBrows.LPoint2 = n;
				   						UnAuthorisedUserObj.MouthToEyeBrows.LPoint3 = o;
				   						UnAuthorisedUserObj.Checker.MouthToLEyeBrows = true;

				   					}



				   					let test = RangeChecker(AuthorisedUserObj.MouthToEyeBrows.LPoint1, UnAuthorisedUserObj.MouthToEyeBrows.LPoint1);
				   					let test1 = RangeChecker(AuthorisedUserObj.MouthToEyeBrows.LPoint2, UnAuthorisedUserObj.MouthToEyeBrows.LPoint2);
				   					let test2 = RangeChecker(AuthorisedUserObj.MouthToEyeBrows.LPoint3, UnAuthorisedUserObj.MouthToEyeBrows.LPoint3);

				   					if (test == true && test1 == true && test2 == true) {
				   						CheckPoint4 = true;
				   					} else {
				   						CheckPoint4 = false;
				   					}



				   				}
				   				//similary to above,we do the same method, we work out the dtiance from different part to the mouth and we use the range checker function to test the range. If both are true, we returen each checkpoint to true.
				   				if (AuthorisedUserObj.Checker.MouthToLEyeBrows == true &&
				   					AuthorisedUserObj.Checker.MouthToLEyes == true &&
				   					AuthorisedUserObj.Checker.MouthToNoseChecker == true &&
				   					AuthorisedUserObj.Checker.MouthToREyeBrows == true &&
				   					AuthorisedUserObj.Checker.MouthToREyes == true) {
				   					TrainingMode = false;
				   				}

				   				//if the range checkers all return true, all checkpoint will also return true meaning our user has been identified.
				   				if (CheckPoint == true && CheckPoint1 == true && CheckPoint3 == true && CheckPoint4 == true) {
				   					UserIdentified = true;
				   				}


				   			}


				   		}


				   	}


				   	this.KeyPressedEvents = function () {
				   		//when the user pressed the space button, we lock the device and set "userIdentified" to false so no filter or actions can be taken.
				   		if (keyCode == 32) {
				   			DeviceLocked = true;
				   			UserIdentified = false;

				   		}
				   		//this function is incharge of all the text information on the canvas. 
				   		this.ScreenInformation();

				   	}


				   	//this method is used to chekc if the device is locked or not, different states have different actions.
				   	this.DeviceLockChecker = function () {
				   		//when the user has been identified, we set the device lock bool to true, This will allow us to add more GUI features such as the lock image
				   		if (UserIdentified == true) {
				   			DeviceLocked = false
				   			image(PicUnPicLocked, width - 100, height - 100);
				   		}
				   		//if the user is unidentified, we lock the device and displaye the locked image
				   		if (UserIdentified == false) {
				   			DeviceLocked = true
				   			image(PicLocked, width - 100, height - 100);
				   		}
				   		this.ScreenInformation();


				   	}

				   	this.ScreenInformation = function () {
				   		//when training mode is true, we displaye the instruction to help guide new users into our sysrtem. When the bool returns true after training, the text will dissaper as its been trained.
				   		if (TrainingMode == true) {
				   			push();
				   			posX = 10
				   			stroke(255);
				   			fill(0)
				   			textSize(15)
				   			text("We need to train our model so it can recognise YOU!", posX, 20);
				   			text("-Place your face in the box and ensure you stare at you camera", posX, 40);
				   			text("-Ensure the Box around your face is the same width and height as the centred box for best results", posX, 60);
				   			text("-A green indicator in the centred box will let you know if you are doing iot correct", posX, 80);
				   			text("-If Green, look at the green and blue circle and press 1 to start training model", posX, 100);
				   			noFill();
				   			pop();

				   		}

				   		//when the key is not = 1, and training mode is false, we do the following:
				   		push();
				   		textSize(15)
				   		stroke(0)
				   		if (keyCode != 49 && TrainingMode == false) {
				   			fill(255, 0, 0);
				   			text("Checking OFF, Press 1 to start Scanning...", 200, 20);

				   		} else {
				   			if (TrainingMode == false) {
				   				fill(0, 255, 0)
				   				text("Checking ONN, Scanning Faces...", 200, 20);
				   			}
				   		}
				   		if (DeviceLocked == true) {
				   			fill(255, 0, 0)
				   			text("Device is  Locked", width - 225, height - 50);
				   			text("look at the blue and green blue ball to unlock.", width / 2 - 120, height / 2 + 15)
				   		}
				   		if (DeviceLocked == false) {
				   			fill(0, 255, 0)
				   			text("Device is UnLocked", width - 250, height - 50)
				   			text("Press Space to Lock Device", width - 270, height - 30)

				   		}
				   		pop();


				   	}
				   	//this method control the filters. It can only be acessed when the device is unlocked and the model is trained

				   	this.filter = function () {
				   		if (keyCode == 50 && UserIdentified == true) {
				   			filter(GRAY);
				   		}
				   		if (keyCode == 51 && UserIdentified == true) {
				   			filter(INVERT);

				   		}
				   		if (keyCode == 52 && UserIdentified == true) {
				   			filter(INVERT);

				   		}
				   		if (keyCode == 53 && UserIdentified == true) {
				   			filter(POSTERIZE, 3);

				   		}
				   		if (keyCode == 54 && UserIdentified == true) {
				   			filter(ERODE);

				   		}
				   		if (keyCode == DOWN_ARROW && UserIdentified == true) {
				   			SceneCounter = 2;

				   		}

				   	}

				   }

				   //this class manages the education side of our aplication. When the user is identified, this allows the calss to be called.

				   function Educate() {
				   	this.setup = function () {
				   		//These are the global variables for our methods.
				   		this.lengthofNetwork = 0;
				   		this.NetworkIdentified = false;
				   		this.hover1 = false;
				   		this.hover2 = false;
				   		this.hover3 = false;
				   		this.hover4 = false;
				   		this.randomfloat = float(random(0, 1));
				   		this.roundedfloat = round(this.randomfloat, 2)
				   		background(255);
						push()
				   		stroke(255);
						fill(0);	
				   		text("How did our appliction recognise our registered user?", width / 2 - 150, 30);
						pop();
				   		line(width / 2, 0, width / 2, height / 2);
				   		line(0, height / 2, width, height / 2);

				   		//different mouse positions across the canvas trigger different animation(methods)
				   		if (mouseX <= width / 2 && mouseY <= height / 2) {
				   			this.Animation1();
				   		}
				   		if (mouseX >= width / 2 && mouseY <= height / 2) {
				   			this.Animation2();
				   		}

				   		if (mouseY >= height / 2) {
				   			this.Animation3();
				   		}

				   	}
				   	this.mouseHover = function () {
				   		//this method is incharge of the hover operation of our mouse in Animation1;
				   		//When a mouse is above a certain positon, we set the bool to true,
				   		if (mouseX >= 344 && mouseX <= 375) {
				   			this.hover1 = true;
				   			this.NetworkIdentified = true

				   		}
				   		//When a mouse is above a certain positon, we set the bool to true,
				   		if (mouseX >= 405 && mouseX <= 435) {
				   			this.hover2 = true;
				   			this.NetworkIdentified = true;

				   		}
				   		//When a mouse is above a certain positon, we set the bool to true,
				   		if (mouseX >= 466 && mouseX <= 498) {
				   			this.hover3 = true
				   			this.NetworkIdentified = true;

				   		}
				   		//When a mouse is above a certain positon, we set the bool to true,
				   		if (mouseX >= 525 && mouseX <= 556) {
				   			this.hover4 = true
				   			this.NetworkIdentified = true;
				   		}


				   	}
				   	this.NeuralNetwork = function () {

				   		//this functions draws our Neura network. I have put it into a function as i will be using it multiple times.
				   		for (var i = 0; i < 5; i++) {

				   			push();
							push();
				   			stroke(255)

				   			if (this.NetworkIdentified == true) {
				   				this.lengthofNetwork += random(15);
				   			}
				   			line(60, 70 * i, 100 + this.lengthofNetwork, 70 * i)
				   			fill(255);
				   			if (this.hover1 == true) {
				   				fill(255, 0, 0);
				   			}
				   			ellipse(60, 70 * i, 30);
				   			fill(0)
				   			text(this.roundedfloat, 50, 70 * i);
				   			pop();
				   			fill(255);
							
							
				   			push();
				   			if (this.hover2 == true) {
				   				fill(0, 255, 0);
				   			}
				   			ellipse(120, 70 * i, 30);
							fill(0)
							
				   			text(this.roundedfloat, 120, 70 * i)
				   			pop();
				   			fill(255)
							
							
				   			push();
				   			if (this.hover3 == true) {
				   				fill(0, 0, 255)
				   			}
				   			ellipse(180, 70 * i, 30);
							fill(0)
				   			text(this.roundedfloat, 180, 70 * i)
				   			pop();

				   			fill(255)
				   			push();
				   			if (this.hover4 == true) {
				   				fill(100, 255, 10);
				   			}
				   			ellipse(240, 70 * i, 30);
							fill(0)
				   			text(this.roundedfloat, 240, 70 * i)
				   			pop();

				   			pop();


				   		}
				   	}
				   	this.Animation1 = function () {
				   		//the mouseHover functions allows us to call this method. We draw our first animation one the mouse is located on the left upper half of the canvas.
				   		point1X = mouseX;
				   		point1Y = mouseY;
				   		point2X = width / 2 - 10;
				   		point2Y = height / 2 - 20;

				   		//we draw our sheldon GUI with our landmarks
				   		image(PicSheldon, width / 2 - 100, height / 2 - 100, 200, 200);
				   		d = dist(point2X, point2Y, point1X, point1Y);
				   		fill(0, 100, 0);
				   		ellipse(point2X - 20, point2Y + 5, 5, 5)
				   		ellipse(mouseX, mouseY, 5, 5);
				   		ellipse(point2X + 10, point2Y, 5, 5);
				   		line(point2X + 10, point2Y, point1X, point1Y)
				   		line(point2X - 20, point2Y + 5, mouseX, mouseY);

				   		//text information
						push();
						fill(0)
						stroke(255);
				   		text("How did we identify the registered user?", width / 2 - 125, 50);
				   		text("Dist :" + d, 30, 70);
				   		push();
				   		translate(0, 100);
				   		text("-Landmarks,which are the dots shown on the screen, are used to create distance coordinates around facial ", 5, height / 2 + 10);
				   		text("features such as eyes and the nose. Each act as indavidual object containing x,y and z coordiantes. We then", 5, height / 2 + 25);
				   		text("use these object to work out the distance between each facial feature. These distances are used to train a model", 5, height / 2 + 40);
				   		pop();
						pop();


				   	}


				   	this.Animation2 = function () {
				   		//when the mouse is on the right upper half of the canvas, we call animation2.
				   		this.mouseHover();
				   		background(0);
				   		push();
				   		stroke(255, 0, 0);
				   		line(width / 2, height / 2, width, height / 2)
				   		line(width / 2, 0, width / 2, height / 2);
				   		pop();
				   		push();
				   		stroke(255);
				   		line(20, height / 2, mouseX, 30);
				   		line(20, height / 2, mouseX, height - 30);
				   		pop();

				   		//we create a random float between the number 0,1
				   		this.randomfloat = float(random(0, 1));
				   		//we round the number to 2 decimal place.
				   		this.roundedfloat = round(this.randomfloat, 2)
				   		ellipse(20, height / 2, 30);

				   		//we call our neural network function and display in in animation 2.
				   		push();
				   		translate(300, 30);
				   		this.NeuralNetwork();
				   		pop();

				   		if (this.hover1 == true) {
				   			//when the bool is true in Animation 2, we display the following information for our user.
				   			push();
				   			translate(15, 10)
				   			textSize(16)
				   			stroke(0)
				   			fill(255)
				   			text("An Artificial Neural Network is made up of 3 components including ", -10, 20);
				   			text("- Input Layer,Hidden (computation) Layers and Output Layer", -10, 40);

				   			text("- Input Layer", 0, 80);
				   			text("The input layer of a neural network is composed ", -10, 100)
				   			text("of artificial input neurons and brings the initial data ", 0, 120)
				   			text("into the system for further processing", 0, 140)
				   			pop();
				   			push();
				   			textSize(20);

				   			pop();
				   		}

				   		if (this.hover2 == true) {
				   			//when the bool is true in Animation 2, we display the following information for our user.
				   			push();
				   			translate(15, 10)
				   			textSize(16)
				   			stroke(0)
				   			fill(255)
				   			text("Each Neuron act as indavidual object which compares the stored data with the ", -10, 20)
				   			text("input data. Each layers acts as a barrier preventing unwanted guest. As", -10, 40)
				   			text("data travels between the layers, different neurons are activated. The provide", -10, 100)
				   			text("accurate output data to compare between.", -10, 120)
				   			pop();
				   			push();
				   			textSize(20);

				   			pop();

				   		}


				   		if (this.hover3 == true || this.hover4 == true) {
				   			//when the bool is true in Animation 2, we display the following information for our user.
				   			drift -= 1;
				   			background(0)
				   			translate(300 + drift, 30);

				   			this.NeuralNetwork();
				   			if (drift <= -282) {
				   				drift = -282
				   				text("Move The Mouse Down For Next Animation", 300, 20);
				   				image(PicDownArrowImage, 300, 40)

				   			}

				   		}


				   	}
				   	this.Animation3 = function () {
				   		//this animtion is drawn when the mouse is in the bottom half of the canvas
				   		background(0)
				   		push();
				   		translate(-100, 20);
				   		this.NeuralNetwork();
				   		pop();
				   		stroke(255);
				   		line(138, height - 40, mouseX, height / 2);
				   		line(138, 20, mouseX, height / 2)
				   		ellipse(width - 50, height / 2, 30);

				   		push();
				   		stroke(255, 0, 0);
				   		line(0, height / 2, width, height / 2)
				   		stroke(0);
				   		fill(255);
				   		text("Bring the mouse to the end circle", width / 2 + -50, height / 2 - 15)
				   		text("Hidden Layer", width / 2 + -150, height / 2 - 30)

				   		//this displays information when the mouse is hovering over the ellipse on the right side.
				   		if (mouseX >= 537 && mouseX <= 566) {
				   			push();
				   			stroke(0)
				   			text("A hidden layer in an artificial neural network is a layer in between ", width / 2 - 120, 10)
				   			text("input layers and output layers,where artificial neurons take in a set ", width / 2 - 120, 30)
				   			text("of weighted inputs and produce an output through an activation function", width / 2 - 120, 50)

				   			text("The output layer in an artificial neural network is the last layer of neurons", width / 2 - 120, 90)
				   			text("that produces given outputs for the program.", width / 2 - 120, 110)
				   			pop();


				   		}
				   		pop();


				   	}


				   }


				   //this is our range checkert function;

				   function RangeChecker(part1, part2) {
				   	let identified = false;

				   	if (part2 >= part1 - 4 && part2 <= part1 + 4) {
				   		identified = true
				   	}

				   	return identified;


				   }