<template>
<div class="container" >
  
    <!------------- Checkout --------------->

    <div class="checkout">
        <h3 class="checkout--title">Checkout</h3>
        <div class="checkout--container">
  <div class="container">
    <div class="row">
      <div class="col-md-9">
                <div class="checkout--breadcrumb">
                    <div class="checkout--breadcrumb--items">
                        <span class="checkout--breadcrumb--item">Food Cart</span>
                        <span class="checkout--breadcrumb--item active">Checkout</span>
                        <span class="checkout--breadcrumb--item">Complete Order</span>
                    </div>
                </div>
                <div class="checkout--form">
                    <form action="" method="post">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="elem--group">
                                    <input type="text" id="name" name="visitor_name" placeholder="ENTER NAME HERE" pattern=[A-Z\sa-z]{3,20}
                                        required>
                                </div>
                                <div class="elem--group">
                                    <input type="text" id="adress" name="visitor_adress" placeholder="ADDRESS" pattern=[A-Z\sa-z]{3,20} required>
                                </div>
                                <div class="elem--group">
                                    <input type="text" id="state" name="state" placeholder="CITY" pattern=[A-Z\sa-z]{3,20} required>
                                </div>
                                <div class="elem--group">
                                    <textarea id="note" name="checkout_note" placeholder="OTHER NOTE" required></textarea>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="elem--group">
                                    <input type="tel" id="phone" name="visitor_phone" placeholder="PHONE NUMBER" pattern=(\d{3})-?\s?(\d{3})-?\s?(\d{4}) equired>
                                </div>
                                <div class="elem--group">
                                    <input type="email" id="email" name="visitor_email" placeholder="EMAIL" required>
                                </div>
                                <div class="elem--group">
                                    <input type="text" id="postal" name="postal" placeholder="POSTAL CODE" pattern=[A-Z\sa-z]{3,20} required>
                                </div>
                                <div class="elem--group">
                                    <input type="text" id="state" name="state" placeholder="STATE" pattern=[A-Z\sa-z]{3,20} required>
                                </div>
                                <div class="elem--group">
                                    <input type="text" id="country" name="country" placeholder="Country" pattern=[A-Z\sa-z]{3,20} required>
                                </div>
                                <div class="elem--group checkout--checkbox">
                                    <input type="checkbox" id="cb" name="cb" class="checkbox" checked>
                                    <label for="cb" class="checkout--checkbox--label">Create an account</label>
                                </div>
                            </div>
                        </div>
                        <div class="checkout--coupon">
                            <input type="text" class="checkout--coupon--input" placeholder="Promo Code">
                            <button class="checkout--coupon--button">Apply Coupon</button>
                        </div>
                        <button type="submit" class="checkout--btn btn">Submit</button>
                    </form>
                </div>
            </div>

            <div class="col-md-3">
                <div class="checkout--right--wrapper">
                    <h3 class="checkout--right--title">ORDER SUMMERY</h3>
                    <div class="checkout--right--items">
                        <div class="checkout--right--item">
                            <div class="checkout--item--info">
                                <h4 class="checkout--item--name">California Roll</h4>
                                <span class="checkout--item--type">crab & cucumber</span>
                                <span class="checkout--item--toppings">Sweet Cheese, Tuna</span>
                            </div>
                            <h4 class="checkout--item--price">£4.99</h4>
                        </div>
                        <div class="checkout--right--item">
                            <div class="checkout--item--info">
                                <h4 class="checkout--item--name">California Roll</h4>
                                <span class="checkout--item--type">crab & cucumber</span>
                                <span class="checkout--item--toppings">Sweet Cheese, Tuna</span>
                            </div>
                            <h4 class="checkout--item--price">£4.99</h4>
                        </div>
                        <div class="checkout--right--item">
                            <div class="checkout--item--info">
                                <h4 class="checkout--item--name">California Roll</h4>
                                <span class="checkout--item--type">crab & cucumber</span>
                                <span class="checkout--item--toppings">Sweet Cheese, Tuna</span>
                            </div>
                            <h4 class="checkout--item--price">£4.99</h4>
                        </div>
                    </div>
                    <div class="checkout--right--total">
                        <h3 class="checkout--right--total--text">TOTAL</h3>
                        <span class="checkout--right--total--money">£10.55</span>
                    </div>
                    <div class="order--shipping">
                        <h3 class="order--shipping--title">Shipping :</h3>
                        <div class="order--shipping--section">
                            <label for="local">
                                <input type="checkbox" class="order--shiping--checkbox" id="local" checked>
                                Local Pickup
                            </label>
                            <h4 class="order--shipping--price">£4</h4>
                        </div>
                        <div class="order--shipping--section">
                            <label for="local">
                                <input type="checkbox" class="order--shiping--checkbox" id="local">
                                Flat Rate
                            </label>
                            <h4 class="order--shipping--price">£4</h4>
                        </div>
                    </div>
                    <div class="checkout--right--button--area">
                        <button class="checkout--right--button">PLACE ORDER</button>
                    </div>
                </div>
            </div>
    </div>
    </div>        
            
        </div>
    </div>

    <!------------------Sample Banner------------------>
    <div class="banner">
        <div class="banner--container">
            <div class="banner--image">
                <img width="100%" src="img/banner_img.png" alt="">
            </div>
        </div>
    </div>
    <footer class="footer">
        <div class="footer--container">
            <div class="footer--sections">
                <h2><span class="project--color">HASH</span> FOOD</h2>
                <P>HASH FOOD is the pioneer of healthy food with high nutrition.</P>
                <p class="footer--copyright">©Copyright HashFood</p>
            </div>
            <div class="footer--sections">
                <ul class="footer--menu">
                    <li class="project--color">
                        <h4 class="footer--sections--header">Feature</h4>
                    </li>
                    <li class="footer--menu--items"><a class="footer--menu--links" href="#">Menu</a></li>
                    <li class="footer--menu--items"><a class="footer--menu--links" href="#">Promo</a></li>
                    <li class="footer--menu--items"><a class="footer--menu--links" href="#">Contact</a></li>
                    <li class="footer--menu--items"><a class="footer--menu--links" href="#">About Us</a></li>
                </ul>
            </div>
            <div class="footer--sections">
                <h4 class="footer--sections--header project--color">Get in Touch</h4>
                <section class="footer--contact">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>2234 Surma Gate, Zindabazar, Sylhet</p>
                </section>
                <section class="footer--contact">
                    <i class="far fa-envelope"></i>
                    <p>demomail@hello.com</p>
                </section>
                <section class="footer--contact">
                    <i class="fas fa-phone-alt"></i>
                    <p>+1 234-567-890</p>
                </section>
            </div>
            <div class="footer--sections">
                <div class="footer--icons footer--sections--header project--color">
                    <i class="fab fa-instagram"></i>
                    <i class="fab fa-linkedin"></i>
                    <i class="fab fa-twitter"></i>
                </div>
                <p class="footer--follow">Follow our social media.</p>
            </div>
        </div>
    </footer>

</div>
</template>