var audio_context,
    recorder,
    volume,
    volumeLevel = 0,
    currentEditedSoundIndex;

function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  console.log('Media stream created.');

  volume = audio_context.createGainNode();
  volume.gain.value = volumeLevel;
  input.connect(volume);
  volume.connect(audio_context.destination);
  console.log('Input connected to audio context destination.');
  
  recorder = new Recorder(input);
  console.log('Recorder initialised.');
}

function changeVolume(value) {
  if (!volume) return;
  volumeLevel = value;
  volume.gain.value = value;
}

function halt() {
    $('#stop').trigger('click');
}

var num;

function startRecording(button) {
  num = 6
  var countdown = setInterval(function() {
    num --;
    $('#start').html(num);
    if (num < 1){
        clearInterval(countdown);
        $('#start').html("Record Again");
        if (button.nextElementSibling.disabled === false){
        halt();
      }
    }
  }, 1000);
  recorder && recorder.record();
  button.disabled = true;
  button.nextElementSibling.disabled = false;
  console.log('Recording...');
  countdown;
  // setTimeout(halt, 6000);
}

function stopRecording(button, num) {
  recorder && recorder.stop();
  button.disabled = true;
  button.previousElementSibling.disabled = false;
  console.log('Stopped recording.');
  $('#start').html("Re-Record");
  // create WAV download link using audio data blob
  createDownloadLink();
  recorder.clear();
  num = 0 
}

function createDownloadLink() {
  currentEditedSoundIndex = -1;
  recorder && recorder.exportWAV(handleWAV.bind(this));
}

function sendWaveToPost1(blob) {
  var data = new FormData();
  var formName = $("#comment_name").val();
  data.append("audio", blob, (new Date()).getTime() + ".wav");
  data.append("poster", formName)
  var oReq = new XMLHttpRequest();
  oReq.open("POST", "/save_file");
  oReq.send(data);
  oReq.onload = function(oEvent) {
  if (oReq.status == 200) {
    console.log("Uploaded");
  } else {
    console.log("Error " + oReq.status + " occurred uploading your file.");
    } 
  };
}

function handleWAV(blob) {
  var tableRef = document.getElementById('recordingslist');
  if (currentEditedSoundIndex !== -1) {
    $('#recordingslist tr:nth-child(' + (currentEditedSoundIndex + 1) + ')').remove();
  }
  var url = URL.createObjectURL(blob);
  var newRow   = tableRef.insertRow(currentEditedSoundIndex);
  newRow.className = 'soundBite';
  var audioElement = document.createElement('audio');
  var downloadAnchor = document.createElement('a');
  var editButton = document.createElement('button');
  var uploadAnchor = document.createElement('a');
  var uploadButton = document.createElement('button');

  
  audioElement.controls = true;
  audioElement.src = url;

  downloadAnchor.href = url;
  downloadAnchor.download = new Date().toISOString() + '.wav';
  downloadAnchor.innerHTML = 'Download';
  downloadAnchor.className = 'btn btn-primary';
  uploadAnchor.upload = new Date().toISOString() + '.wav';
  uploadAnchor.innerHTML = 'Upload';
  uploadAnchor.className = 'btn btn-primary upload';

  // edit

  var newCell = newRow.insertCell(-1);
  newCell.appendChild(audioElement);
  newCell = newRow.insertCell(-1);
  newCell.appendChild(uploadAnchor);

  var oldRow = document.getElementById('recordingslist').deleteRow(0);
  var formName = $("#comment_name").val();
  function addElement () {
  var newLi = document.createElement("li");
  var person = document.createElement("div");
  person.setAttribute("id", "name");
  var user = document.createTextNode(formName);
  newLi.appendChild(person);
  person.appendChild(user);
  newLi.appendChild(audioElement);
  var comments = $('#soundBite')
  comments[0].appendChild(newLi)    
  var amplify = document.createElement("div");
  amplify.setAttribute("id", "amplify");
  amplify.setAttribute("class", "glyphicon glyphicon-bullhorn");
  newLi.appendChild(amplify);
  var score = document.createElement("div");
  var number = document.createTextNode("0");
  score.appendChild(number);
  score.setAttribute("id", "score");
  newLi.appendChild(score);
  }
 

 $( ".upload" ).click(function() {
    sendWaveToPost1(blob);
    var oldRow = document.getElementById('recordingslist').deleteRow(0);
    var nameForm = document.getElementById('name_form');
    nameForm.parentNode.removeChild(nameForm);
    var thanks = $('#thanks').html("Thanks for contributing!");
    addElement();
  });
}


window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL;
    
    audio_context = new AudioContext();
    console.log('Audio context set up.');
    console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    console.warn('No web audio support in this browser!');
  }
  
  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    console.warn('No live audio input: ' + e);
  });

  };