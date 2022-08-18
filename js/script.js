const URL = 'https://api.apify.com/v2/key-value-stores/vpfkeiYLXPIDIea2T/records/LATEST?disableRedirect=true'

const $main = $('main');
const $form = $('form');
const $input = $('input[type="text"]');


$form.on('submit', handleSubmit);

function result(stateName)
{
    const promise = $.ajax(`${URL}`);
    promise.then(
        function(data) {
            //console.log(`Data: `, data.State.Durango);
            const state = data.State[stateName];

            const infected = state.infected;
            const deceased = state.deceased;

            console.log(state);

            window.swal({
                title: stateName,
                text: `In ${stateName} there are ${infected} infected persons and ${deceased} deceased.`,

                icon: "success",
                button: "ok",
              });
        },
        function(error) { 
            console.log(`Error: `, error)
        });
}

function handleSubmit(event) {
    event.preventDefault();
 
    const state = $input.val();

    if(!state) return;

    result(state);
}

function start () {
    const states = $('svg a');

  $(states).each(function() {
    const state = $(this)

    state.on('click', function(params) {
      const value = params.currentTarget.attributes[0].value;

      result(value);
    })}
    )   
}

start();