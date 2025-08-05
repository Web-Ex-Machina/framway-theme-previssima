app.loadInputs = app.loadShareButtons = app.loadCustomDatepickers = function(){
	return new Promise(function(resolve,reject){
	    resolve()
	});
};

global.getCheckboxValue = function getCheckboxValue(input){
    var value;
    // CHECKBOXES
    if ($(input).attr('type') == 'checkbox') {
        if ($('*[name="'+$(input).attr('name')+'"]').length > 1) { // multiple checkbox, should return array of values
            value = [];
            $('*[name="'+$(input).attr('name')+'"]').each(function(){
                if ($(this).isChecked())
                    value.push(this.value);
            });
        } else { // unique checkbox, should return 1 or 0
            value = ($(input).isChecked()) ? 1 : 0;
        }
    }

    // RADIOS
    if ($(input).attr('type') == 'radio') {
        $('*[name="'+$(input).attr('name')+'"]').each(function(){
            if ($(this).isChecked())
                value = (this.value);
        });
    }
    return value;
}


global.objApp = app;