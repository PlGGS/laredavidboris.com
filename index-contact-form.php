<div class="col-lg-2"></div>
<div class="col-lg-8">
    <form method="post" action="/send-message/">
        <div class="row">
          <div class="form-group col-lg-6">
            <!--<label for="contact-name">Your Name</label>-->
            <input type="text" class="form-control" name="name" required id="contact-name" placeholder="Your Name">
          </div>
          <div class="form-group col-lg-6">
            <!--<label for="contact-email">Your Email Address</label>-->
            <input type="email" class="form-control" name="email" required id="contact-email" placeholder="Your Email Address">
          </div>
          <div class="form-group col-lg-12">
            <!--<label for="exampleFormControlTextarea1">Example textarea</label>-->
            <textarea class="form-control" required name="message" id="exampleFormControlTextarea1" rows="6" placeholder="Your Message"></textarea>
          </div>
          <div class="form-group col-lg-12">
            <button type="submit" class="btn btn-default" style="float: right"><i class="fa fa-send fa-fw" aria-hidden="true"></i><span class="network-name">Send</span></button>
          </div>
        </div>
    </form>
</div>