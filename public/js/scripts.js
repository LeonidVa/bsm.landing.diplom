$('.slick').slick({
    centerMode: true,
    centerPadding: '60px',
    variableWidth: true,
    infinite: true,
    slidesToShow: 7,
    autoplay: 1,
    arrows: false,
    adaptiveHeight: true
    // responsive: [
    //   {
    //     breakpoint: 1400,
    //     settings: {
    //       centerPadding: '180px',
    //       slidesToShow: 2
    //     }
    //   },
    //   {
    //     breakpoint: 1000,
    //     settings: {
    //       centerPadding: '60px',
    //       slidesToShow: 2
    //     }
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       centerPadding: '10px',
    //       slidesToShow: 2
    //     }
    //   },
    //   {
    //     breakpoint: 660,
    //     settings: {
    //       centerPadding: '0',
    //       slidesToShow: 1
    //     }
    //   }
    // ]
});

$('.slick2').slick({
    centerMode: true,
    centerPadding: '50px',
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: 1,
    arrows: false,
    adaptiveHeight: true
});

$('.slick3').slick({
    centerMode: true,
    centerPadding: '0',
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: 1,
    arrows: false/*,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        centerPadding: '0',
        slidesToShow: 2,
          centerMode: false,
           variableWidth: false
      }
    },
    {
      breakpoint: 880,
      settings: {
        centerPadding: '0',
        slidesToShow: 2
      }
    },
    {
      breakpoint: 660,
      settings: {
        centerPadding: '0',
        slidesToShow: 1
      }
    }
  ]*/
});

var accordion = function() {

    $('.block-accordion:not(.expanded) .block-accordion__body').hide();

    $('.block-accordion:not(.disabled) .block-accordion__body').prev().click(function() {
        $('.block-accordion:not(.disabled) .block-accordion__body').not(this).slideUp();
        $(this).next().not(':visible').slideDown();
    });
}

accordion();


$(document).ready(function(){
    $('.go-to').click( function(){
        var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 1500);
        }
        return false;
    });
});

// $(".to-modal__order-call").click(function(e) {
//     e.preventDefault();
//     $(".modal__order-call").fadeIn();
// });

// $(".to-modal__ask-question").click(function(e) {
//     e.preventDefault();
//     $(".modal__ask-question").fadeIn();
// });

// $(document).mouseup(function (e) {
//     var container = $(".modal-form");
//     var container2 = $(".to-modal__order-call");
//     if (container.has(e.target).length === 0 && container2.has(e.target).length === 0) {
//         $(".modal__order-call").fadeOut();
//     }
// });

//modals
$modalWrap = $(".modal-overlay");
$allModals = $(".modal");

$(document).on("click", "*[data-modal]", function(ev) {
    ev.preventDefault();

    $allModals.hide();
    $modalWrap.hide();

    var modalName = $(this).data("modal");

    $modalWrap.show();
    $("."+modalName).show();
});

$modalWrap.click(function(ev) {
    if (!$allModals.is(ev.target) && $allModals.has(ev.target).length == 0) {
        $allModals.hide();
        $modalWrap.hide();
    }
});

$(".modal__close-but").click(function() {
    $allModals.hide();
    $modalWrap.hide();
});

$('.humburger').click(function() {
    $(this).fadeOut();
    $('.menu-mob').addClass('open');
    $('.menu-mob__close').fadeIn();
});

$('.menu-mob__close').click(function() {
    $(this).fadeOut();
    $('.menu-mob').removeClass('open');
    $('.humburger').fadeIn();
});

$('.menu-mob__title').click(function() {
    $('.menu-mob__close').fadeOut();
    $('.menu-mob').removeClass('open');
    $('.humburger').fadeIn();
});

$('.modal__dark-close').click(function() {
    $(this).parent().fadeOut();
});

$('.modal-sale__close, .modal-estimate__close').click(function() {
    $(this).parent().parent().fadeOut();
});

$(document).ready(function() {
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        var $header = $(".header");

        if ($.attr(this, 'href').length < 2) {
            return false;
        }

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - $header.height() - 15
        }, 500);
    });

    $(".file-input input").change(function() {
        var $this = $(this);
        var $fileNameText = $this.closest(".file-input").find(".file-input-placeholder");
        var fileName = $this.val().replace("C:\\fakepath\\",'');

        if (fileName) {
            $fileNameText.html(fileName);
            $(".file-input-delete-btn").addClass("shown");
        } else {
            $fileNameText.html("Добавить файл");
        }

    });

    $(".file-input-delete-btn").click(function() {
        var $this = $(this);

        $this.closest(".file-input").find("input").val("");
        $this.closest(".file-input").find(".file-input-placeholder").html("Добавить файл");
        $this.removeClass("shown");
    });

    $(".block-form__more-info").click(function() {
        var $additionalFields = $(this).closest("form").find(".block-form__additional-fields");

        if ($additionalFields.is(":visible")) {
            $additionalFields.slideUp();
            $(this).html("Дополнительная информация");
        } else {
            $additionalFields.slideDown();
            $(this).html("Скрыть дополнительную информацию");
        }



    });

    /**
     * Отправка данных на сервер
     * @param {FormData} data
     * @return {void}
     */
    function sendRequest(data) {
        $.ajax({
            type: 'POST',
            url: 'http://2018.besmarter.ru/api/form_data',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function() {
                alert('С вами скоро свяжется менеджер!');
            },
            error: function(e) {console.log(e);
                alert('Ошибка сервера! Попробуйте повторить попытку через 5 минут.');
            },
        });
    }

    /**
     * Обработка отправки формы
     * @param {String} id - id формы
     * @param {Array} fields - Поля формы которые следует отправить на сервер
     * @return {void}
     */
    function form(id, fields) {
        $('#' + id + ' [type="submit"]').on('click', function(e) {
            var $form = $('#' + id);
            if ($form[0].checkValidity()) {
                e.preventDefault();
                e.stopPropagation();

                var data = new FormData();

                for(var i = 0; i < fields.length; i++) {
                    var field = fields[i];
                    switch(field) {
                        case 'file':
                            var files = $form.find('[name="file"]')[0].files;
                            if (files.length > 0) {
                                data.set('files', files[0]);
                            }
                            break;

                        default:
                            data.set(field, $form.find('[name="' + field + '"]').val());
                            break;
                    }
                }

                data.set('verified', true);

                sendRequest(data);
            }
        });
    }

    form('form1', [
        'name', 'phone', 'email', 'theme', 'worktype',
        'discipline', 'deadline', 'size', 'comment', 'file',
    ]);
    form('form2', ['phone']);
    form('form3', [
        'name', 'phone', 'email', 'theme', 'worktype',
        'discipline', 'deadline', 'size', 'comment', 'file',
    ]);
    form('form4', ['name', 'phone']);
    form('form5', ['phone', 'name', 'comment']);
});