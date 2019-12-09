let CTX = {
  routes: [
    {
      selector: ".update_form",
      source: "#data",
      url: "/settings/update",
      autohide: false
    },


     /**
     * Bot controller
     */
    {
      selector: "#turn_on_bitmex",
      url: "/settings/turn_on_bitmex",
      autohide: true
    },

    {
      selector: "#turn_off_bitmex",
      url: "/settings/turn_off_bitmex",
      autohide: true
    },
    {
      selector: "#turn_on_binance",
      url: "/settings/turn_on_binance",
      autohide: true
    },

    {
      selector: "#turn_off_binance",
      url: "/settings/turn_off_binance",
      autohide: true
    },
    {
      selector: "#turn_on_bybit",
      url: "/settings/turn_on_bybit",
      autohide: true
    },

    {
      selector: "#turn_off_bybit",
      url: "/settings/turn_off_bybit",
      autohide: true
    },
    {
      selector: "#turn_on_verbit",
      url: "/settings/turn_on_verbit",
      autohide: true
    },

    {
      selector: "#turn_off_verbit",
      url: "/settings/turn_off_verbit",
      autohide: true
    },
  ],

    /**
     * Check if robot is running
     */
    check_status: function () {
        $.ajax({
            type: "GET",
            url: "/status",
            data: {
                get_param: "value"
            },
            dataType: "json",
            success: function (data) {
                var is_running = data["is_running_bitmex"];
                if (is_running) {
                    $("#turn_on_bitmex").hide();
                    $("#turn_off_bitmex").show();
                } else {
                    $("#turn_on_bitmex").show();
                    $("#turn_off_bitmex").hide();
                }
            }
        })
    },

  /**
   * Main method
   */
  run: function() {
    console.debug("run");

    // Modules
    TabSystem.init();

    //Status checker
    CTX.check_status();
    setInterval(function () {
        CTX.check_status();
    }, 5 * 1000);

    $(".turning_button").on('click', function() {
        CTX.check_status();
    })


    // Routing
    for (var r in CTX["routes"]) {
        var aobj = CTX["routes"][r];
  
        var selector = aobj["selector"];
        var url = aobj["url"];
        var autohide = aobj["autohide"];
  
        var source = "";
        if (typeof aobj["source"] != "undefined") {
          source = aobj["source"];
        }
        console.debug(source + " | " + selector + " => " + url);
        button_ctrl(source, selector, url, autohide);
      }
  },


};

CTX.run();
