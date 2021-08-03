$(function () {
    headerEvt();
    uiDropdown('.sub-depth-wrap .dropdown-menu');
    fileUpload();
    quick();
    uiTab();
});

function gnbOpen() {
    var gnb = $('#gnb');
    var btn = $('header .btn-menu-all');
    var dim = '<div class="gnb-dim" onclick="gnbClose();">&nbsp;</div>';
    
    btn.addClass('open');
    gnb.show();
    gnb.before(dim);
    setTimeout(function(){
        gnb.addClass('m-open');
    }, 20);
}
function gnbClose() {
    var gnb = $('#gnb');
    var btn = $('header .btn-menu-all');

    gnb.removeClass('m-open');
    btn.removeClass('open');
    $('header .gnb-dim').remove();
    setTimeout(function(){
        gnb.hide();
    }, 300);
}
function headerScroll() {
    var didScroll,
        lastScrollTop = 0,
        delta = 5,
        navbarHeight = 80;

    $(window).scroll(function (e) {
        didScroll = true;
    });
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 150);

    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight) {
            $('header').addClass('scroll');
        } else if (st < lastScrollTop && st < navbarHeight) {
            $('header').removeClass('scroll');
        }

        lastScrollTop = st;
    }
}
function headerEvt() {
    // scroll
    headerScroll();
    // mobile click
    $('header .btn-menu-all').click(function(){
        $(this).hasClass('open') ? gnbClose() : gnbOpen();
    });
    // mobile gnb toggle
    $('#gnb .btn-depth-more').click(function(){
        var self = $(this);
        var depth = self.siblings('ul.depth2');
        var allBtn = $('#gnb .btn-depth-more');
        var allDepth = $('#gnb ul.depth2');

        if (self.hasClass('open')){
            depth.slideUp();
            self.removeClass('open');
        } else {
            allBtn.removeClass('open');
            allDepth.slideUp();
            self.addClass('open');
            depth.slideDown();
        }
    });
}

// file upload 
function fileUpload() {
    var obj = $('.inputfile-wrap');
    
    if (obj.length <= 0) return;

    var fileTarget = obj.find('input[type=file]');

    fileTarget.on('change', function(){
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }

        $(this).siblings('input[type=text]').val(filename);
    });
}

// dropdown
function uiDropdown(obj) { 
    var wrap = $(obj);
    $(obj+' .btn-toggle').on('click', function(e){
        var btn = $(this);
        var lists = btn.siblings('.lists');
        var wraps = btn.closest(obj);

        e.stopPropagation();
        e.preventDefault();

        if (wraps.hasClass('open')){
            wraps.removeClass('open');
        } else {
            $(obj).removeClass('open');
            wraps.addClass('open');
        }
    });
    $('html').click(function(e){
        if ( !$(e.target).is(wrap) ) {
            wrap.removeClass('open');
        }
    });
}

// quick menu
function quick() {
    var quick = $('#quick');
    var oriTop = quick.offset().top;
    var hdOh = $('header').outerHeight(true);

    var totop = quick.find('a.totop');

    $(window).scroll(function(){
        var st = $(this).scrollTop();

        if (st > oriTop-hdOh){
            quick.css('top', st+hdOh+50);
        } else {
            quick.css('top', oriTop);
        }
    });

    totop.click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop : 0
        }, 200);
        return false;
    });
}

// tab UI
function uiTab() {
    var tab = '[data-toggle="tab"]';
    
    // default each
    $(tab).each(function(){
        var $tab = $(this);
        $tab.find('a, button').each(function(){
            var tg = $(this).data('target');
            $(tg).hide();
        });

        var defaultTg = $tab.find('li.active').find('a, button').data('target');
        $(defaultTg).show();
    });

    // click
    $(tab).find('a, button').click(function(){
        var btn = $(this);
        var target = btn.data('target');
        var siblings = btn.closest('li').siblings().find('a, button');

        siblings.each(function(){
            var id = $(this).data('target');
            $(this).attr('aria-selected', false);
            $(this).closest('li').removeClass('active');
            $(id).hide();
        });

        btn.attr('aria-selected', true);
        btn.closest('li').addClass('active');
        $(target).show();
    });
}