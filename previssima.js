require('jssocials');
require('jssocials/dist/jssocials.css');
require('jssocials/dist/jssocials-theme-flat.css');

app.loadCustomDatepickers = 
app.loadBackgrounds       = 
app.loadDatePickers       = 
app.loadGalleries         = 
app.loadBackToTop         = 
app.loadPageElements      = function(){
    console.log('--- Called deprecated function');
    console.log(this);
    // throw new Error()
	return new Promise(function(resolve,reject){
	    resolve()
	});
};


global.getMethodsFromObj = utils.getObjMethods;
global.getObjBy = utils.getObjBy;
global.uniqid = utils.uniqid;
global.groupByObj = utils.groupByObj;
global.getObjSize = utils.getObjSize;
global.isImageUrl = utils.isImageUrl;
global.addHtmlHook = utils.addHtmlHook;
global.renderError = utils.renderError;
global.checkFormValidity = utils.checkForm;

global.DetectDimension = function DetectDimension() {
    dim_win_width = window.innerWidth;
    dim_win_height = window.innerHeight;
    dim_win = [dim_win_width,dim_win_height];
    return dim_win;
}
global.dimension = DetectDimension();

global.addToLogs = function addToLogs(log, blnWindow = false){
    if(blnWindow){
        var content = $('#debugWindow').html();
        content+=log+'<br>';
        $('#debugWindow').html(content).show();
        $("#debugWindow").scrollTop($("#debugWindow")[0].scrollHeight);
    }
    console.log("------------------");
    console.log(log);
}
global.clearLogs = function clearLogs(){
    $('#debugWindow').html('').hide();
}
global.toggleLoader = function toggleLoader() {
    $('html').toggleClass('no-overflow');
    $('#load_mask').toggleClass('hidden');
}
global.isJSON = function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

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

global.setCookie = function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


global.getCookie = function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

global.hexToRgbA = function hexToRgbA(hex,opa = 1){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+opa+')';
    }
    throw new Error('Bad Hex');
}

global.resize = function resize()
{
    dimension = DetectDimension();
    var minHeight = dimension[1] - $('#header').outerHeight() - $('#footer').outerHeight();
    $('#container').css('min-height', minHeight);
    $('.ce_list_items.inline .item .img_container').each(function(){
        // $(this).css('min-height',0).css('min-height',$(this).parent().outerHeight());
    });
    setTimeout(function(){
        $('.item iframe').each(function(index,frame){
            $(frame).css('height',0);
            var $item = $(frame).closest('.item');
            if(($item.outerWidth() / $item.parent().outerWidth() * 100) != 100){
                $(frame).css('height',$item.outerHeight());
            }
            else{
                $(frame).css('height',$item.prev('.item').outerHeight());
            }
        });
    },500);
}


global.getURLComponent = function getURLComponent(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}

global.toastrNoRest = function toastrNoRest(method, msg) {
    notif_fade[method](msg)
}


global.compareFields = function compareFields(field1, field2, msg){
    if(field1.val() != "" && field2.val() != "")
    {
        if(field1.val()!=field2.val())
        {
            document.getElementById(field1.attr('id')).setCustomValidity(msg);
            field2.removeClass('success').addClass('error');
            field1.removeClass('success').addClass('error');
        }
        else
        {
            document.getElementById(field1.attr('id')).setCustomValidity('');
            document.getElementById(field2.attr('id')).setCustomValidity('');
            field2.removeClass('error').addClass('success');
            field1.removeClass('error').addClass('success');
        }
    }
    else
    {
        document.getElementById(field1.attr('id')).setCustomValidity('');
        document.getElementById(field2.attr('id')).setCustomValidity('');
        field2.removeClass('error success');
        field1.removeClass('error success');
    }
}

app.checkHeaderPos = function(){
    var app = this;
    if(window.scrollY >= $('header#header').outerHeight() + 200 && dimension[1] > 400) {
        if(!app.header_stick) {
            $('div#wrapper').css('padding-top', $('header#header').outerHeight());
            $('header#header').addClass('sticky').hide().fadeIn();
            app.header_stick = true;
        }
    }
    else {
        $('div#wrapper').css('padding-top', 0);
        $('header#header').removeClass('sticky');
        app.header_stick = false;
    }
}

/**
   * Copy the content of the element provided to the clipboard
   * @param  {DOM element} elem
   * @return {Boolean}
   */
app.copyToClipboard = function(elem,full=false) {
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "fixed";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        if(full)
          target.textContent = elem.outerHTML;
        else
          target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}



app.loadPasswordManager = function(){
    var app = this;
    var passwordInputs = $('input.password');
    var passwordControls = $('.pwd-control');
    var passwordTogglers = $('button.pwd-hs');
    $.each(passwordInputs, function(index,passwordInput){
        passwordInput = $(passwordInput);
        passwordInput.bind('keyup',function(){
            if(passwordInput.attr('data-compare') != '' && typeof passwordInput.attr('data-compare') != 'undefined')
            {
                var passwordInputCompare = $('#'+passwordInput.attr('data-compare'));
                var msg = "Les mots de passe ne correspondent pas !";
                compareFields(passwordInput,passwordInputCompare,msg);
            }
        });
    });

    $.each(passwordControls, function(index,passwordControl){
        passwordControl = $(passwordControl);
        var passwordControled = $('#'+passwordControl.attr('data-control'));
        passwordControled.bind('keyup',function(){
            passwordValidate(passwordControl, passwordControled.val());
        })
    });
    $.each(passwordTogglers, function(index,passwordToggler){
        passwordToggler = $(passwordToggler);
        passwordToggler.bind('click', function(){
            passwordHideOrShow(passwordToggler);
        })
    });

    function passwordValidate(controler, value){
        //validate the length
        if ( value.length < 8 ) {
            controler.find('.length').removeClass('valid').addClass('invalid');
        } else {
            controler.find('.length').removeClass('invalid').addClass('valid');
        }
        //validate letter
        if ( value.match(/[a-z]/) ) {
            controler.find('.letter').removeClass('invalid').addClass('valid');
        } else {
            controler.find('.letter').removeClass('valid').addClass('invalid');
        }
        //validate uppercase letter
        if ( value.match(/[A-Z]/) ) {
            controler.find('.capital').removeClass('invalid').addClass('valid');
        } else {
            controler.find('.capital').removeClass('valid').addClass('invalid');
        }
        //validate number
        if ( value.match(/\d/) ) {
            controler.find('.number').removeClass('invalid').addClass('valid');
        } else {
            controler.find('.number').removeClass('valid').addClass('invalid');
        }
    }
    function passwordHideOrShow(toggler){
        var fields = toggler.attr('data-fields').split(',');
        $.each(fields, function(index, value){
            if($('input#' + value).attr('type') == 'password')
            {
                $('input#' + value).attr('type','text');
                toggler.addClass('fa-eye-slash');
            }
            else if($('input#' + value).attr('type') == 'text')
            {
                $('input#' + value).attr('type','password');
                toggler.removeClass('fa-eye-slash');
            }
        });
    }
}


app.formatInputsFields = function(container){
    var app = this;
    var fields = container.find('.form-group');
    fields.each(function(index,field){
        field = $(field);
        field.find('label').addClass('icon').find('span').remove();
        var placeholder = field.find('label').text().trim();
        var FAtag = '';
        field.find('input,select').attr('placeholder',placeholder);
        field.find('p.error').insertAfter(field.find('input'));

        if(placeholder.search(/mail/i) != -1){
            FAtag = '<i class="fa fa-envelope-o"></i>';
        }
        else if(placeholder.search(/nom/i) != -1 || placeholder.search(/identifiant/i) != -1){
            FAtag = '<i class="fa fa-vcard-o"></i>';
        }
        else if(placeholder.search(/sécurité/i) != -1){
            FAtag = '<i class="fa fa-warning"></i>';
        }
        else if(placeholder.search(/mot de passe/i) != -1){
            FAtag = '<i class="fa fa-lock"></i>';
        }
        else if(placeholder.search(/profil/i) != -1){
            FAtag = '<i class="fa fa-suitcase"></i>';
        }
        else{
            FAtag = '<i class="fa fa-pencil"></i>';
        }
        field.find('label').html(FAtag);
    });
}

app.setContextBlock = function(content,event,target,close){
    var app = this;
    var $block = $($.parseHTML('<div class="block_context"><div class="arrow"></div>'+content+'</div>'));
    if(close !== false)
        $block.prepend($('<div class="close"><i class="fa fa-close"></i></div>').bind('click',function(){$block.slideUp(400,function(){$(this).remove()});}));
    if(target){
        if(target.next('.block_context').length)
            target.next('.block_context').slideUp(400,function(){$(this).remove()});
        $block.insertAfter(target);
    }
    if(event){
        var offsetArrow = $(event.currentTarget).offset().left + ($(event.currentTarget).outerWidth()/2) - $(event.currentTarget).parent().offset().left;
        $block.find('.arrow').css('left',offsetArrow);
    }
    return $block;
}

app.loadinputs = function(){
    $('select.dropdown').not('.chosen').each(function(index, elem){
        var $elem = $(elem).show();
        var dd_id = $elem.attr("name");
        if($elem.closest('.custom_lightbox').length)
            dd_id += '-'+ $elem.closest('.custom_lightbox').attr('id').replace('=','');
        $('#dd-'+dd_id).remove();
        var $dropdown = '<div class="dropdown '+$elem.attr("class")+'" id="dd-'+dd_id+'">'
                        + '<div class="dropdown-toggle" data-toggle="dropdown">'
                        + '<span class="text">'+$elem.find('option[value="'+$elem.val()+'"]').html()+'</span>'
                        + '<span class="icon fa fa-chevron-down"></span>'
                        + '</div>'
                        + '<div class="dropdown-menu"></div>'
                        + '</div>';
        $dropdown = $($.parseHTML($dropdown));
        $.each($elem.find('option'),function(index,option){
            var $li = $($.parseHTML('<li data-value="'+$(option).attr('value')+'">'+$(option).html()+'</li>'));
            $dropdown.find('.dropdown-menu').append($li);
        });
        $dropdown.find('li').bind('click',function(){
            $elem.val($(this).attr('data-value'));
            $dropdown.find('.dropdown-toggle .text').html($(this).html());
            $elem.trigger('change');
        });
        $dropdown.find('.dropdown-toggle').bind('click', function () {
            var distanceFromBottom = $(document).height() - ($dropdown.position().top + $dropdown.outerHeight(true));
            var menuHeight = $dropdown.find('.dropdown-menu').outerHeight(true);
            if(menuHeight > distanceFromBottom)
                $dropdown.addClass('dropup');
            else
                $dropdown.removeClass('dropup');
            $(this).find('.icon.fa').toggleClass('fa-chevron-up fa-chevron-down')
        });
        if($elem.closest("*[class*='bg-']")){
            var color = $elem.closest("*[class*='bg-']").css('background-color');
            $dropdown.css('background-color',color);
            $dropdown.find('.dropdown-menu').css('background-color',color);
        }
        $elem.after($dropdown).addClass('hiddenButNotTooMuch');
        $dropdown.find('.dropdown-toggle').dropdown();

        if($dropdown.find('li').length <= 1 && $dropdown.find('li').first().attr('data-value') == ""){
            $dropdown.hide().parent('.widget').hide();
        }
    });
    $("select.chosen").each(function(index,select){
        $elem = $(select);
        var objConfig = {};
        if($elem.attr('maxlength'))
            objConfig.max_selected_options = $elem.attr('maxlength');
        objConfig.search_contains = true;
        $elem.chosen(objConfig).addClass('hiddenButNotTooMuch');
    });
}

app.loadFilters = function(){
    var btnFiltersContainers = $('.filters');
    btnFiltersContainers.each(function(index,container){
        container = $(container);
        var btnFilters = container.find('.filter');
        var filters =  Array();
        var itemsContainer = $('#'+ container.attr('data-container'));
        var items = itemsContainer.find('.'+itemsContainer.attr('data-items'));

        btnFilters.each(function(index,btn){
            btn = $(btn);
            if(btn.attr('data-filter') != 'all' && btn.attr('data-filter') != 'others')
                filters[btn.attr('data-filter')] = Array();
            filters['others'] = Array();
        });

        items.each(function(index, item){
            item = $(item);
            var arrItemFilters = item.attr('data-filter').split(',');
            $.each(arrItemFilters,function(index,strFilter){
                if(typeof filters[strFilter] != 'undefined'){
                    filters[strFilter].push(item);
                }
                else
                    filters['others'].push(item);
            });
        });

        btnFilters.each(function(index,btn){
            btn = $(btn);
            if(btn.attr('data-filter') != 'all') {
                if(filters[btn.attr('data-filter')].length != 0) {
                    if(!container.hasClass('no-count'))
                        btn.html(btn.html() + ' ('+ filters[btn.attr('data-filter')].length +')');
                }
                // else
                //     btn.addClass('hidden');
            }
            else {
                if(!container.hasClass('no-count'))
                    btn.html(btn.html() + ' ('+ items.length +')');
            }
        })

        btnFilters.bind('click',function(){
            if(container.hasClass('checkbox_container')){
                var arrFilters = Array();
                var checkBoxes = container.find('.filter').not(this).not('[data-filter="all"]').prev('.checkbox'); // all button's checkboxes except the one clicked, because of delayed event
                if($(this).attr('data-filter') == 'all'){  // if the "all" button is clicked
                    if($(this).prev('.checkbox').isChecked() == 0)
                        checkBoxes.each(function(){this.checked = true;}); // if the button was unchecked, check all buttons
                    else
                        checkBoxes.each(function(){this.checked = false;}); // if the button was checked, uncheck all buttons
                    arrFilters.push('all');
                }
                else {
                    var trackAll = true; // tracker to know if we should check the "all" button
                    if($(this).prev('.checkbox').isChecked() == 0) // if the clicked button was previously unchecked, add it to the filters array
                        arrFilters.push($(this).attr('data-filter'));
                    else
                        trackAll = false;
                    checkBoxes.each(function(index,checkbox){
                        if($(checkbox).isChecked() == 1 ) // if button is checked, store it in the filters array
                            arrFilters.push($(checkbox).next('.filter').attr('data-filter'));
                        else  // if button isn't checked, set the tracker at false
                            trackAll = false;
                    });
                    if(trackAll){  // this is done only if all buttons are checked
                        arrFilters = ['all'];
                        if (container.find('.filter[data-filter="all"]').prev('.checkbox').length)
                            container.find('.filter[data-filter="all"]').prev('.checkbox')[0].checked = true; // check the "all" button
                    }
                    else{
                        if (container.find('.filter[data-filter="all"]').prev('.checkbox').length)
                            container.find('.filter[data-filter="all"]').prev('.checkbox')[0].checked = false; // the button clicked is about to be unchecked, so we make sure the "all" button is unchecked too
                    }
                     // if arrFilters is empty, this mean not a single button is checked, so we display all items
                    if(arrFilters.length == 0)
                        arrFilters = ['all'];
                }
                addToLogs("filtres sélectionnés: " + arrFilters);
                items.not('[data-filter="all"]').addClass('hidden');
                
                $.each(arrFilters,function(index,filter)
                {
                    // if(filter == 'all' && container.find('.filter[data-filter="all"]').prev('.checkbox')[0].checked == false)
                    if(filter == 'all')
                    {
                       items.removeClass('hidden');
                    }
                    else
                    {
                        $.each(filters[filter],function(index,item)
                        {
                            $(item).removeClass('hidden');
                        });
                    }
                });
            }
            else{
                var btn = $(this);
                var filter = btn.attr('data-filter');
                btnFilters.removeClass('active');
                btn.addClass('active');
                if(filter == 'all')
                    items.removeClass('hidden');
                else {
                    items.addClass('hidden');
                    $.each(filters[filter],function(index,item){
                        $(item).removeClass('hidden');
                    });
                }
            }
        });

        // Fire the items treatments
        items.not('[data-filter="all"]').addClass('hidden');
        $.each(btnFilters,function(index,btn){
            // If the filter isn't check, it's useless to check the concerned items
            if(!$(btn).prev().isChecked())
                return true;

            // If all, display items
            if($(btn).attr("data-filter") == 'all')
                items.removeClass('hidden');
            else
            {
                // Else, get all items concerned by the current filter to display them
                $.each(filters[$(btn).attr("data-filter")],function(index,item){
                    $(item).removeClass('hidden');
                });
            }
        });
    });
};


app.loadShareButtons  = function(){
    var app = this;
    var shareButtons = $('.mod_share_buttons');
    jsSocials.shares.twitter = {
        label: "Tweet",
        logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDYuNS4xIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjQgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZD0iTTM4OS4yIDQ4aDcwLjZMMzA1LjYgMjI0LjIgNDg3IDQ2NEgzNDVMMjMzLjcgMzE4LjYgMTA2LjUgNDY0SDM1LjhMMjAwLjcgMjc1LjUgMjYuOCA0OEgxNzIuNEwyNzIuOSAxODAuOSAzODkuMiA0OHpNMzY0LjQgNDIxLjhoMzkuMUwxNTEuMSA4OGgtNDJMMzY0LjQgNDIxLjh6Ii8+PC9zdmc+",
        shareUrl: "https://twitter.com/share?url={url}&text="+$('h1').first().text()+"&via={via}&hashtags={hashtags}",
        countUrl: "https://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
        getCount: function(data) {
            return data.count;
        }
    };
    jsSocials.shares.reddit = {
        label: "Reddit",
        logo: "fa fa-reddit-alien",
        shareUrl: "https://www.reddit.com/submit?title="+$('h1').first().text()+"&selftext=true&url={url}",
    };
    jsSocials.shares.email.logo = "fa fa-envelope-o";
    $.each(shareButtons, function(){
        var sb_id = 'mod_share_buttons_'+uniqid();
        var blnLabels = false;
        var arrShares = [ "linkedin", "twitter", "facebook", "reddit", "whatsapp", "email"];
        if($(this).closest('.share').hasClass('labels')){
            blnLabels = true;
            arrShares = [{share:'facebook', label:'Facebook'}, {share:'twitter', label:'Twitter'}, {share:'linkedin', label:'Linkedin'}, {share:'googleplus', label:'Google +'}];
        }
        $(this).attr('id',sb_id);
        $('#' + sb_id).jsSocials({
            showLabel: blnLabels,
            showCount: false,
            shareIn: "popup",
            shares: arrShares
        });
    });
} 

window.jQuery = $;
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.Context.refreshAll();for(var e in i)i[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,n.windowContext||(n.windowContext=!0,n.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),i=this.element==this.element.window;t&&e&&!i&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s];if(null!==a.triggerPoint){var l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=Math.floor(y+l-f),h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();

window.addEventListener("load", function(e) {
    // VARIABLES ---------------------------------------------------------------------------------------------------------
    var scrolling = false;

    // EVENTS ------------------------------------------------------------------------------------------------------------
    $('body').on('change keyup blur','input:not([type="submit"]):not([type="reset"]):not([type="button"])',function(){
        if($(this).val() != '')
            $(this).addClass('active');
        else
            $(this).removeClass('active');
    });

    $(window).resize(function() {
        resize();
    });

    // share modal copy button
    $('body').on('click', '.modalFW[data-name=modalFW__share] .copy', function(e) {
        if(app.copyToClipboard($(this).prev('input').get(0)))
            $(this).text('Lien copié')
    });

    // Cookie block
    try{
        if(localStorage.getItem('pre_cookies_accepted') != 1)
        {
            $.ajax({
                type: 'get',
                url:'system/modules/previssima/assets/html/block_cookies.html'
            })
            .done(function(msg){
                $('body').append(msg);
                $('.cookies .close-cookies').bind('click', function(e) {
                    e.preventDefault();
                    $(this).parent().fadeOut(500, function() { $('.cookies').remove(); });
                    localStorage.setItem('pre_cookies_accepted', 1);
                    // $('.dfp-slide-in').css({
                    //     'opacity':1,
                    //     'pointer-events':'all'
                    // });
                });
                // $('.dfp-slide-in').css({
                //     'opacity':0,
                //     'pointer-events':'none'
                // });
            });
        }
    } catch(e){
        console.log(e);
    };

    // Header events - Start
    $('#header .menu .h-button').bind('click',function(){
        $('#header .mod_customnav').addClass('active');
        $('*[class*="dfp-background"]').fadeOut();
        $('html').addClass('no-overflow');
    });
    $('.menu_close').bind('click',function(){
        $('#header .mod_customnav').removeClass('active');
        $('*[class*="dfp-background"]').fadeIn();
        $('html').removeClass('no-overflow');
    });
    $('.h-button').bind('click',function(){
        $('.h-button').not(this).removeClass('focus');
        $(this).toggleClass('focus');
    });

    $('body').on('click',function(e){
        if(!$(e.target).hasClass('h-button') && $(e.target).closest('.h-button').length == 0 && $(e.target).closest('.h-sub').length == 0)
            $('.h-button').removeClass('focus');
    });
    // Header events - End

    // $('.ce_list_items .search-container .filter select+.dropdown .dropdown-toggle').next('.dropdown-menu').remove();
    $('.ce_list_items .search-container .filter select[name=dropdown]').on('mousedown keypress', function(e) {
        e.preventDefault()
        this.blur();
        window.focus();
        var h = 0;
        if (!$('.filter__categories').hasClass('active')){
            h = $('.filter__categories').get(0).scrollHeight + 30;
        }
        $(this).toggleClass('active');
        $('.filter__categories').toggleClass('active');
        $('.filter__categories').css('height', h)
    });
    if ($('.ce_list_items .search-container .filter select+.dropdown .dropdown-toggle').length) {
        var resizeToggler;
        $(window).resize(function()
        {
            clearTimeout(resizeToggler);
            resizeToggler = setTimeout(function(){ 
                if ($('.filter__categories').hasClass('active')){
                    $('.filter__categories').css('height','')
                    $('.filter__categories').css('height', $('.filter__categories').get(0).scrollHeight)
                }
            }, 500);
        });
    }


    $('.ce_list_items .search-container .search input').bind('keyup',function(event){
        if (event.keyCode == 13)
            $(this).next('button').trigger('click');
    });

    $('.ce_list_items .requestMore').not('[data-mode=first]').bind('click',function(e){
        e.preventDefault()
        var $button = $(this);
        var $container = $button.closest('.ce_list_items');
        $.ajax({
            type: 'post',
            data: {
                TL_AJAX: true,
                REQUEST_TOKEN: $container.attr('data-token'),
                module_id: $container.attr('data-module'),
                action: 'getItems',
                page: $button.attr('data-cpt'),
            },
        })
        .done(function(msg){
            if(isJSON(msg)){
                try {
                    var results = jQuery.parseJSON(msg);
                    if(results.status == "success"){
                        Waypoint.destroyAll();
                        if($button.attr("data-mode") == "prev")
                            results.items.reverse();

                        $.each(results.items,function(index, item){
                            var $item = $($.parseHTML(item));
                            if($button.attr("data-mode") == "next")
                                $container.find('.items_wrapper').append($item.hide().fadeIn(400));
                            else
                                $container.find('.items_wrapper').prepend($item.hide().fadeIn(400));
                        });
                        updateHash($button.attr('data-cpt'));

                        if($button.attr("data-mode") == "prev") {
                            if($button.attr('data-cpt') == 1){
                                $button.add('.requestMore[data-mode=first]').closest('.more').hide();
                            }
                            else
                                $button.attr('data-cpt', parseInt($button.attr('data-cpt')) - 1);
                        }
                        else {
                            if(results.items.length >= 30)
                                $button.attr('data-cpt', parseInt($button.attr('data-cpt')) + 1);
                            else
                                $button.closest('.more').hide();
                        }
                        $('.noticeMeSenpai').waypoint(function(direction){
                            if(direction == 'down')
                                updateHash(parseInt($(this.element).attr('data-cpt')));
                            else
                                updateHash(parseInt($(this.element).attr('data-cpt')) - 1);
                        },{offset:'bottom-in-view'});

                        function updateHash(pageNum){
                            var strPushState = window.location.href.split('?')[0];
                            var paramString = '?';
                            if(window.location.href.split('?')[1]){
                                if(window.location.href.split('?')[1].indexOf('query') != -1){
                                    strPushState += paramString + window.location.href.split('?')[1];
                                    strPushState = strPushState.split('&')[0];
                                    paramString = '&';
                                }
                            }
                            if(pageNum > 1)
                            {
                                strPushState += paramString+'page='+pageNum;
                                strPage = " : Page " + pageNum;
                            }
                            else
                                strPage = "";

                            document.title = document.title.replace(/\s:\sPage\s(\d+)/g, "") + strPage;
                            $('meta[name=description]').attr('content', $('meta[name=description]').attr('content').replace(/\s:\sPage\s(\d+)/g, "") + strPage);
                            history.pushState({}, document.title, strPushState);
                        }
                    }
                    else{
                        toastrNoRest(results.status, results.msg);
                    }
                    $(window).trigger('resize');
                    app.loadBackgrounds();
                    // Waypoint.refreshAll();
                } catch(e){
                    toastrNoRest('error',e);
                    addToLogs(e);
                }
            }
        })
        .fail(function(xhr, textStatus, error){
            toastrNoRest('error',error);
            addToLogs(xhr, textStatus, error);
        });
    });

    // $('.goto').bind('click',function(event){
    //     event.preventDefault();
    //     var target = $(this).attr('data-goto').split(',');
    //     if(target.length==1)
    //         target = target[0];
    //     else{
    //         $.each(target,function(index,item){
    //             if($('#'+item).length){
    //                 target = item;
    //                 return false;
    //             }
    //         });
    //     }
    //     if($('#'+target).length){
    //         window.location.hash = '#'+target;
    //         window.location.replace(window.location);
    //         $('body,html').animate({
    //             scrollTop: $('#'+target).offset().top - $('header#header').outerHeight() ,
    //             }, 400
    //         );
    //     }
    // });

    // check end of scrolling
    $.fn.scrollEnd = function (callback, timeout) {
      $(this).scroll(function () {
        var $this = $(this);
        if (document.querySelector('html').scrollTop < 200){
            app.checkHeaderPos();
        }
        if ($this.data('scrollTimeout')) {
          clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback, timeout));
      });
    };

    $(window).on('scroll', function () {
      scrolling = true;
    });

    $(window).scrollEnd(function () {
      scrolling = false;
      app.checkHeaderPos();
    }, 300); 


    app.loadinputs();
    app.loadShareButtons();
});

global.objApp = app;