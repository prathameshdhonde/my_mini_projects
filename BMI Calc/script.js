
let button = document.getElementById('btn');
 
button.addEventListener('click', () =>{
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const result = document.getElementById('output');
    let height_value = false, weight_value = false;

    if(height === '' || isNaN(height) || ( height <=0 )){
        document.getElementById('height_error').innerHTML = 'Enter valid height!';
    }else{
        document.getElementById('height_error').innerHTML= '';
        height_value=true;
    }

    if(weight === '' || isNaN(weight) || ( weight <=0 )){
        document.getElementById('weight_error').innerHTML = 'Enter valid weight!';
    }else{
        document.getElementById('weight_error').innerHTML= '';
        weight_value=true;
    }

    if(height_value && weight_value){
        const bmi = (weight / ((height * height)/10000)).toFixed(2);

        if(bmi < 18.6){

            result.innerHTML = 'Under Weight : '+ bmi;

        }else if(bmi >= 18.6 && bmi < 24.9){

            result.innerHTML = 'Normal : ' + bmi;

        }else {
            result.innerHTML = 'Over weight : '+ bmi;
        }
    }else{
        alert('Enter correct valuse!')
    }
});
