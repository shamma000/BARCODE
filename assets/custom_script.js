$(document).ready(function () {
	const custom_owl_next = `<img src="${ig_next_button}" class="w-75" alt="">`;
	const custom_owl_prev = `<img src="${ig_prev_button}" class="w-75" alt="">`;


	$('.owl-carousel').owlCarousel({
		loop: true,
		margin: 10,
		responsiveClass: true,
		navText: [
			custom_owl_prev,
			custom_owl_next
		],
		responsive: {
			0: {
				items: 1,
				nav: true,
				loop: true
			},
			800: {
				items: 3,
				nav: true,
				loop: true
			},
			1000: {
				items: 5,
				nav: true,
				loop: true
			}
		}
	})

});

$(".variant_label").click(function () {
	let variant_checked_disable = $(this).attr("disabled");
	if (!variant_checked_disable) {
		let src = $(this).attr("data-src");
		$(".product_image").attr("src", src);

	}
});


$(".to_remove").click(function () {
	const cart = Shopify.theme.cart;
	let key = $(this).attr("data-remove");
	cart.removeItem(key).then(state => {
		cart.getState().then(data => {
			//converting data value to USD 
			console.log(data.total_price)
			let t_price = data.total_price;
			t_price = t_price.toString();
			t_price = t_price.slice(0, -2);
			t_price = parseInt(t_price);
			t_price = t_price.toLocaleString('en-US', { style: 'currency', currency: 'USD', });

			//update cart total price
			$("#cart_total").text(t_price);
		});
	});
});

$('.to_remove').each(function (i, obj) {
	$(".to_remove").trigger("click");
});

$(".quantity").on("input", function () {
	let cart_item_id = $(this).attr("data-key");
	let cart_item_key = $(this).attr("data-cart-index");
	let cart_item_price = $(this).attr("data-price");
	let cart_item_new_quantity = $(this).val();
	let cart_item_new_price = Number(cart_item_price * cart_item_new_quantity);

	cart.updateItem(cart_item_id, { quantity: Number(cart_item_new_quantity) })
		.then(state => {
			cart.getState().then(data => {
				//converting data value to USD 
				console.log(data.total_price)
				let t_price = data.total_price;
				t_price = t_price.toString();
				t_price = t_price.slice(0, -2);
				t_price = parseInt(t_price);
				t_price = t_price.toLocaleString('en-US', 
					{ 
						style: 'currency', 
						currency: 'USD', 
					}
				);
				
			//update product item total price
			$("#price" + cart_item_key).text("$" + cart_item_new_price + ".00");
			//update cart total price
			$("#cart_total").text(t_price);
		});
		var item = state.items.find(item => item.key === cart_item_id);
		console.log(`The item with key '${cart_item_id}' now has quantity ${item.quantity}`);
	});

	cart.getState().then(data => {
		console.info(data.items[0]);
	});
});
$("[type='number']").keypress(function (evt) {
	evt.preventDefault();
});



