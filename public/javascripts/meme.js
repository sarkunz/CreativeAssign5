var iterator = 1;
var colors = ["#fc3c3c", "#f8b500", "#00adb5", "#112f41"];

 angular.module('meme', [])
     .controller('MainCtrl', [
         '$scope', '$http',
         function($scope, $http) {
             $scope.memes = [];

             $scope.titleClick = function() {
                 var randSize = Math.random() * 30;
                 if (iterator > 3) iterator = 0;
                 var color = colors[iterator];
                 iterator++;
                 var el = "<div class='header' style='color: " + color + "; font-size:" + randSize + "vw;'>";
                 el += "MEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEMEME</div>";
                 $('.headers').append(el);
                 setListeners();
             };

             $scope.addMeme = function() {
                 var newmeme = { name: $scope.nameForm, url: $scope.urlForm, upvotes: 0 };
                 $http.post('/memes', newmeme).success(function(data) {
                     $scope.memes.push(data);
                 });
                 $scope.nameForm = '';
                 $scope.urlForm = '';
             };

             $scope.incrementUpvotes = function(meme) {
                 $http.put('/memes/' + meme._id + '/upvote')
                     .success(function(data) {
                         meme.upvotes += 1;
                     });
             };
             $scope.decrementUpvotes = function(meme) {
                 $http.put('/memes/' + meme._id + '/downvote')
                     .success(function(data) {
                         meme.upvotes -= 1;
                     });
             };
             $scope.delete = function(meme) {
                 $http.delete('/memes/' + meme._id)
                     .success(function(data) {
                     });
                 $scope.getAll();
             };
             $scope.getAll = function() {
                 return $http.get('/memes').success(function(data) {
                     angular.copy(data, $scope.memes);
                 });
             };
             $scope.getAll();
         }
     ]);


 $(document).ready(function() {
     setListeners();
 });

function setListeners() {
     $('.header').mouseover(function(event) {
         if (iterator > 3) iterator = 0;
         var color = colors[iterator];
         $(event.currentTarget).css('color', color);
         iterator++;
     });
 }
 