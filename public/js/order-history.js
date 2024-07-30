const _0x1e764d = _0x4341;
function _0x4341(_0x1d80e5, _0x2ca851) {
    const _0x365d49 = _0x365d();
    return _0x4341 = function (_0x434155, _0x58f56d) {
        _0x434155 = _0x434155 - 0x165;
        let _0x1b46fa = _0x365d49[_0x434155];
        return _0x1b46fa;
    }, _0x4341(_0x1d80e5, _0x2ca851);
}
(function (_0x716c1c, _0x559312) {
    const _0x43f23a = _0x4341;
    let _0x1c63fb = _0x716c1c();
    while (true) {
        try {
            const _0x54153a = -parseInt(_0x43f23a(0x172)) / 1 + -parseInt(_0x43f23a(0x1bf)) / 2 + -parseInt(_0x43f23a(0x190)) / 3 + parseInt(_0x43f23a(0x1c8)) / 4 - parseInt(_0x43f23a(0x16a)) / 5 * (parseInt(_0x43f23a(0x1a1)) / 6) + parseInt(_0x43f23a(0x177)) / 7 * (parseInt(_0x43f23a(0x195)) / 8) + parseInt(_0x43f23a(0x1c9)) / 9;
            if (_0x54153a === _0x559312) break;
            else _0x1c63fb.push(_0x1c63fb.shift());
        } catch (_0x5a3f7b) {
            _0x1c63fb.push(_0x1c63fb.shift());
        }
    }
}(_0x365d, 0x50336));

const orderRefundModal = document.getElementById('orderRefundModal');

$(document).ready(async function () {
    const _0x56fdf6 = _0x1e764d;

    function getActualDate(purchasedDate) {
        const _0x12a4ed = _0x4341;
        let offset = purchasedDate.getTimezoneOffset() * 60 * 1000;
        return new Date(purchasedDate - offset).toISOString().slice(0, 10);
    }

    function populateTherapist(therapistInfo, cartData) {
        const _0x140d7d = _0x4341;
        let multiplier;
        let row = '<tr class="tableRows">';
        row += `<td>${getActualDate(new Date(cartData.purchased))}</td>`;
        row += `<td>${new Date(cartData.expiringTime).toLocaleString('en-CA', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>`;
        row += `<td>${therapistInfo.fullName}</td>`;

        switch (cartData.timeLength) {
            case 'freePlan':
                row += '<td>Trial</td>';
                multiplier = 0;
                break;
            case 'monthPlan':
                row += '<td>1 Month</td>';
                multiplier = 1;
                break;
            case 'threeMonthPlan':
                row += '<td>3 Months</td>';
                multiplier = 3;
                break;
            default:
                row += '<td>1 Year</td>';
                multiplier = 6;
        }

        row += `<td>$${(therapistInfo.sessionCost * multiplier * 1.12).toFixed(2)}</td>`;
        row += `<td>${cartData.orderId}</td>`;
        row += `<td class="${cartData.status === 'refunded' ? 'refundedStatus' : (new Date(cartData.expiringTime) > new Date() ? 'activeStatus' : 'expiredStatus')}">
                    ${cartData.status === 'refunded' ? 'Refunded' : (new Date(cartData.expiringTime) > new Date() ? 'Active' : 'Expired')}
                </td></tr>`;
        
        $('#orderTable tbody').append(row);
    }

    await $.ajax({
        url: '/getPreviousPurchases',
        type: 'GET',
        success: function (data) {
            if (data.length > 0) {
                $('#noOrderHistorySummary').hide();
                $('#orderToolbar').show();
                $('#orderTableContainer').show();

                data.forEach(cartData => {
                    getTherapist(cartData, populateTherapist);
                });
                $('#resultsFound').text(data.length);
            } else {
                $('#noOrderHistorySummary').show();
                $('#orderToolbar').hide();
                $('#orderTableContainer').hide();
            }
        }
    });

    $('.carets').each(function() {
        $(this).addClass('bi-caret-down-fill');
    });

    $('.carets').click(function () {
        $(this).toggleClass('bi-caret-down-fill bi-caret-up-fill');
        $(this).parent().siblings().toggle();
    });
});

$('#closeOrderRefund').click(function () {
    orderRefundModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.onclick = function (event) {
    if (event.target === orderRefundModal) {
        orderRefundModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}
