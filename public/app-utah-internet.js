// Execute JavaScript on page load
$(function() {

  var addresses = [
    {
      name: "Representative Robert Bishop",
      title: "the representative",
      address1: "1017 Federal Building",
      address2: "324 25th St",
      city: "Ogden",
      state: "Utah",
      zip: "84401",
      number: "8016250107"
    },
    {
      name: "Representative Christopher Stewart",
      title: "the representative",
      address1: "420 East South Temple",
      address2: "#390",
      city: "Salt Lake City",
      state: "Utah",
      zip: "84111",
      number: "8013645550"
    },
    {
      name:"Representative Jason Chaffez",
      title: "the representative",
      address1: "51 S University Ave.",
      address2: "Suite 318",
      city: "Provo",
      state: "Utah",
      zip: "84601",
      number: "8018512500"
    },
    {
      name:"Representative Mia Love",
      title: "the representative",
      address1: "9067 South 1300 West",
      address2: "Suite 101",
      city: "West Jordan",
      state: "Utah",
      zip: "84088",
      number: "8019968729"
    },
    {
      name:"Senator Michael Lee",
      title: "the senator",
      address1: "125 South State",
      address2: "Suite 4225",
      city: "Salt Lake City",
      state: "Utah",
      zip: "84138",
      number: "8015245933"
    },
    {
      name:"Senator Orrin Hatch",
      title: "the senator",
      address1: "8402 Federal Building",
      address2: "125 South State Street",
      city: "Salt Lake City",
      state: "Utah",
      zip: "84138",
      number: "8015244380"
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
