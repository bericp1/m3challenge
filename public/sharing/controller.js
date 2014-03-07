module.exports = ['$rootScope', '$scope', 'AuthUserService', function ($rootScope, $scope, UserService) {
  'use strict';

  $scope.state = {
    input: {
      text: '',
      url: '',
      image: ''
    },
    user: UserService.user
  };
  $scope.data = [
    {
      data: 'http://google.com',
      type: 'url',
      creator: 'Brandon',
      color: ''
    },
    {
      data: 'Test text',
      type: 'text',
      creator: 'Christian',
      color: ''
    },
    {
      data: 'data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAD///8B////Af///wH///8B////AUGF6B9Dh+iZQ4fomUaJ6CH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////AWif7S9QkOrlQIXo/0WH6P88g+fnLHnlN////wH///8B////Af///wH///8B////Af///wH///8B////Af///wF5qu9Fearv/2if7f8teeX/HG7j/xtu41P///8B////Af///wH///8B////Af///wH///8B////Af///wH///8BdqjvQ3ep7/94qu//JHXk/xtu4/8ecONR////Af///wH///8B////Af///wH///8B////Af///wH///8B////AXmq7w13qe95dajv5yZ25O8bbuOJHG7jE////wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////AXeq7yElduQp////Af///wH///8BRIjoIUOH6IlDh+hfQ4foA////wH///8B////Af///wH///8B////Af///wH///8B////Af///wFWk+oJRonofz+E6OlChuj/RIjo/0aI6MP///8B////Af///wFDh+gzQ4foq0OH6KVAhegr////Af///wH///8BfKzvJXGk7vlXlOv/RIjo/0CF5/8ueuX/////AT6E6C9BheidQ4fo90OH6P9Dh+j/Q4fo8UWJ6JE+hOcl////AXep7yN4qe/tfazv/2Wd7P8fcOP/G27j/////wFlnezHTI3p/z6E6P9Ahej/RIjo/0aJ6P8+hOf/J3bkyTB85QN4qe8hdqjv+3qq7/9qoe3/G27i/x1w4/////8BeqvvyXip7/9kne3/Sozp/z6E5/8teuX/HXDj/xht4tUqd+UHdqjvC3eo74t6qu/xaaDt/xxv4v8dcOPd////AXao78d3qO//e6vv/3Sn7v8ndeT/GW3j/x1w4/8ecOPTGm7jCf///wH///8BeqrvKWmg7Z0cb+J/HXDjE////wF2qO/Ldqjv/3ep7/91p+7/J3Xk/xtu4/8ecOP/HnDj1Rtu4gn///8B////Af///wH///8B////Af///wH///8BdqjvuXao7/93qe//dKfu/yd15P8bbuP/HnDj/x5w48kecOMH////Af///wH///8B////Af///wH///8B////AXao7xt2qO+Bd6nv53Sn7v8ndeT/G27j7x5w448ecOMj////Af///wH///8B////Af///wH///8B////Af///wH///8B////AXep7x90p+6PJ3Xkmxtu4yn///8B////Af///wH///8B////Af///wH///8B////Af///wH///8BAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w==',
      type: 'image',
      creator: 'Maddie',
      color: ''
    }
  ];

  if($scope.state.user !== false){

  }

  $scope.$watch(function(){return UserService.user;}, function(){
    $scope.state.user = UserService.user;
  });
}];