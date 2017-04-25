// Execute JavaScript on page load
$(function() {

  var addresses = [
    {
      name:"Senator Orrin Hatch",
      title: "the senator",
      address1: "8402 Federal Building",
      address2: "125 South State Street",
      city: "Salt Lake City",
      state: "Utah",
      zip: "84138",
      number: "8015244380"
    },
    {
      name: "The White House",
      title: "President",
      address1: "1600 Pennsylvania Ave",
      address2: "",
      city: "Washington",
      state: "DC",
      zip: "",
      number: "2024561111"
    }
  ];

    $('.action').addClass('disable');
    $('#yourCity').html('_______________');
    $('#yourZip').html('_______________');
    $('#yourName').html('_______________');
    $('.custom span').hide();
    $('#customDefault').show();
    $('#mocName').show().html('them');

    var options = $.map(addresses, function(address, i) {
      $('#targetPicker').append("<option value='" + i + "'>" + address.name + "</option>");
    });

    function checkValid() {
      $('.action').removeClass('disable').addClass('disable');
      var phoneNumber = $('#phoneNumber').val();
      var targetNumber = $('#targetPicker').val();

      if (targetNumber !== 'choose' && phoneNumber !== '') {
        if (phoneNumber.match(/\d/g).length===10) {
          $('.action').removeClass('disable');
        }
      }
    }

    $('#phoneNumber').on('keyup', function() {
      checkValid();
    });

    $('input[name="name"]').on('keyup', function() {
      $('#yourName').html($(this).val());
    });

    $('input[name="city"]').on('keyup', function() {
      $('#yourCity').html($(this).val());
    });

    $('input[name="zip"]').on('keyup', function() {
      $('#yourZip').html($(this).val());
    });

    $('#targetPicker').on('change', function() {
      var selected = $('#targetPicker').val()
      $('#congressNumber').val(addresses[selected].number);
      checkValid();
      // if (selected === '2') {
      //   $('#customDefault, #mocLee, #mocChaffetz').hide();
      //   $('#mocChaffetz').show();
      // } else if (selected === '4') {
      //   $('#customDefault, #mocLee, #mocChaffetz').hide();
      //   $('#mocLee').show();
      // } else {
      //   $('#mocLee, #mocChaffetz').hide();
      //   $('#mocName').html(addresses[selected].title)
      //   $('#customDefault').show();
      // }
    });

    $('#callForm').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/call',
            method: 'POST',
            dataType: 'json',
            data: {
                phoneNumber: $('#phoneNumber').val(),
                targetNumber: $('#congressNumber').val()
            }
        }).done(function(data) {
            alert(data.message);
        }).fail(function(error) {
            alert('We\'re sorry, there\'s been a problem. We\'ll fix it soon! Please try back in an hour or so.'+JSON.stringify(error));
        });
    });
});
