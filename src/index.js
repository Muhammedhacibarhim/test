
// import '@laylazi/bootstrap-rtl-scss/dist/css/bootstrap-rtl.min.css';
import './scss/style.scss';
import './css/style.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js'
import '@laylazi/bootstrap-rtl/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all.min'
import 'webpack-jquery-ui'
import 'webpack-jquery-ui/css'
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js'


$(function(){

    $('[data-toggle="tooltip"]').tooltip()

    $('.add-to-cart-btn').click(function(){
        alert("أضيف المُنتج إلى عربة الشراء");
    });

    $('#copyright').text("جميع الحقوق محفوظة للمتجر سنة " + new Date().getFullYear());

    $(".product-option input[type=radio]").change(function(){
        $(this).parents(".product-option").siblings().removeClass("active");
        $(this).parents(".product-option").addClass("active");
    });


    $('[data-product-quantity]').change(function(){

        var newQuantity = $(this).val();

        var Parent = $(this).parents('[data-product-info]');

        var PricePerUnit = Parent.attr('data-product-price');

        var TotalPriceForProduct = newQuantity * PricePerUnit;

        Parent.find('.total-price-for-product').text(TotalPriceForProduct + '$');

        calculateTotalPrice();
    });

    $('[data-remove-from-cart]').click(function(){
        $(this).parents('[data-product-info]').remove();
        calculateTotalPrice()
    })

    function calculateTotalPrice() {
        var totalPriceForAllProducts = 0;

        $('[data-product-info]').each(function(){

            var PricePerUnit = $(this).attr('data-product-price');

            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPriceForProduct = PricePerUnit * quantity;

            totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
        });

        $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
    };

    var citiesByCountry = {
        sa: ['جدة','الرياض'],
        eg: ['الإسكندرية','القاهرة'],
        jo: ['عمان','الزرقاء'],
        sy: ['حماه','دمشق','حلب']
    };

    $('#form-checkout select[name="country"]').change(function(){
        var country = $(this).val();

        var cities = citiesByCountry[country];

        $('#form-checkout select[name="city"]').empty();

        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">اختر المدينة</option>'
        );

        cities.forEach(function(city) {
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        });
    });

    $('#form-checkout input[name="payment_method"]').change(function(){

        var paymentMethod = $(this).val();

        if (paymentMethod === 'on_delivery') {

            $('#credit-card-info input').prop('disabled', true);
            
        }else {
            $('#credit-card-info input').prop('disabled', false);
        }

        $('#credit-card-info').toggle();
    });

    $('#price-range').slider({
        range: true,
        min: 50,
        max: 1000,
        step: 50,
        values: [250, 800],
        slide: function(event, ui) {
            $('#price-min').text(ui.values[0]);
            $('#price-max').text(ui.values[1]);
        }
    });

});

