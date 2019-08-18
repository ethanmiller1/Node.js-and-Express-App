// module.exports = {
//   1: function() {},
//   // Numbers are keys in the dictionary
//   2: function() {},

//   3: function() {},
// }

/* ===== GENERIC FUNCTIONS ===== */

//cursor
var cursor = {
  delay: 8,
  _x: 0,
  _y: 0,
  endX: (window.innerWidth / 2),
  endY: (window.innerHeight / 2),
  cursorVisible: true,
  cursorEnlarged: false,
  $dot: document.querySelector('.cursor-dot'),
  $outline: document.querySelector('.cursor-dot-outline'),
  init: function () {
    this.dotSize = this.$dot.offsetWidth;
    this.outlineSize = this.$outline.offsetWidth;
    this.setupEventListeners();
    this.animateDotOutline();
  },
  setupEventListeners: function () {
    var self = this;
    document.querySelectorAll('a').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        self.cursorEnlarged = true;
        self.toggleCursorSize();
      });
      el.addEventListener('mouseout', function () {
        self.cursorEnlarged = false;
        self.toggleCursorSize();
      });
    });
    document.addEventListener('mousedown', function () {
      self.cursorEnlarged = true;
      self.toggleCursorSize();
    });
    document.addEventListener('mouseup', function () {
      self.cursorEnlarged = false;
      self.toggleCursorSize();
    });
    document.addEventListener('mousemove', function (e) {
      self.cursorVisible = true;
      self.toggleCursorVisibility();
      self.endX = e.pageX;
      self.endY = e.pageY;
      self.$dot.style.top = self.endY + 'px';
      self.$dot.style.left = self.endX + 'px';
    });
    document.addEventListener('mouseenter', function (e) {
      self.cursorVisible = true;
      self.toggleCursorVisibility();
      self.$dot.style.opacity = 1;
      self.$outline.style.opacity = 1;
    });
    document.addEventListener('mouseleave', function (e) {
      self.cursorVisible = true;
      self.toggleCursorVisibility();
      self.$dot.style.opacity = 0;
      self.$outline.style.opacity = 0;
    });
  },
  animateDotOutline: function () {
    var self = this;
    self._x += (self.endX - self._x) / self.delay;
    self._y += (self.endY - self._y) / self.delay;
    self.$outline.style.top = self._y + 'px';
    self.$outline.style.left = self._x + 'px';
    requestAnimationFrame(this.animateDotOutline.bind(self));
  },
  toggleCursorSize: function () {
    var self = this;
    if (self.cursorEnlarged) {
      self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
      self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    } else {
      self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
      self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  },
  toggleCursorVisibility: function () {
    var self = this;
    if (self.cursorVisible) {
      self.$dot.style.opacity = 1;
      self.$outline.style.opacity = 1;
    } else {
      self.$dot.style.opacity = 0;
      self.$outline.style.opacity = 0;
    }
  }
};
cursor.init();

//smooth scroll

var smoothScroll = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$window = $(window);
    this.$page = $('html, body');
  },
  bindEvents: function() {
    this.$window.on('mousewheel', this.wheel.bind(this));
  },
  wheel: function(event) {
    var delta = 0;
    if (event.originalEvent.wheelDelta) delta = event.originalEvent.wheelDelta / 120; // Returns an integer value indicating the distance that the mouse wheel rolled (always a multiple of 120).
    else if (event.originalEvent.detail) delta = -event.detail / 3; // Returns number of scrolls.

    // console.log(delta);
    // console.log(event.detail);

    this.handle(delta);

  },
  handle: function(delta) {
    var time = 700;
	  var distance = 200;
    
    this.$page.stop().animate(
      {scrollTop: this.$window.scrollTop() - (distance * delta)},
      time,
      'swing'
    );
  }
}

smoothScroll.init();

/****** Parallax ******/

var parallax = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$bg = $('.fixed-background.background');
    this.$page = $(document);
  },
  bindEvents: function() {
    this.$page.on('scroll', this.displace.bind(this));
  },
  displace: function() {
    // Scroll top position divided by height of page.
    const scroll = 2 * this.$page.scrollTop() / this.$page.height();
    
    // Select the figure children and declare corresponding scroll values for each child.
    images = this.$bg.children().toArray();
    values = [-105, -183, -275, -401, -634, -634];

    // For each image, offset Y position by corresponding amount.
    i = 0;
    images.forEach(function(image) {
      image.style.transform = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,' + scroll * values[i] + ',0,1)';
      i++;
    });
  }
};

parallax.init()


/****** Tooltips ******/

var tooltips = {
  init: function() {
    this.cacheDom();
    this.settings();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$tooltip = $('[data-toggle="tooltip"]');
    this.$btn = $('button');
  },
  bindEvents: function() {
    this.$btn.on('mousedown', this.show.bind(this));
    this.$btn.on('mouseleave', this.hide.bind(this));
  },
  settings: function() {
    this.$tooltip.tooltip({
      animation: true,
      delay: {show: 500, hide: 100}
    });
  },
  show: function() {
    this.$tooltip.tooltip('hide');
  },
  hide: function() {
    this.$tooltip.tooltip('hide');
  }
}

$(document).ready(tooltips.init());

/* ===== LAYOUT ===== */


/****** Loader ******/

var preloader = {
  init: function() {
    this.cacheDom();
    this.scaleIn();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$window = $(window);
    this.$wrapper = $('.loader-wrapper');
    this.$preloader = $('.preloader')
    this.$bg = this.$preloader.find('.preloader-bg');
    this.$pattern = this.$bg.find('.preloader-bg__pattern')
    this.$animation = this.$preloader.find('.preloader-animation');
    this.$text = this.$preloader.find('.preloader-msg');
  },
  bindEvents: function() {
    this.$window.on('load', this.fade.bind(this));
    // this.$window.on('load', setTimeout(this.fade.bind(this), 700));
  },
  fade: function() {
    this.$wrapper.fadeOut('slow');
    this.scaleOut();
  },
  scaleIn: function() {
    this.$pattern.addClass('visible');
  },
  scaleOut: function() {
    this.$bg.addClass('height-animate');
    this.$animation.addClass('shrink');
    this.$text.addClass('shrink');
    setTimeout(function () {
      $('.preloader').remove();
    }, 700); // Set to match preloader.pug height-animate rule
  },
}

$(document).ready(preloader.init());

/****** Navbar ******/

var stickyNav = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$win = $(window);
    this.$doc = $(document);
    this.$header = $('nav');
    this.$sidebar = $('.sidebar');
    pixalsDown = 0;
    // console.log('CD > pixalsDown:' + pixalsDown);
    // console.log('CD > scrollTop:' + this.$doc.scrollTop());
  },
  bindEvents: function() {
      this.$doc.on('scroll', this.resetScroll.bind(this));
  },
  resetScroll: function() {
    // console.log('pixalsDown:' + pixalsDown);
    // console.log('scrollTop:' + this.$doc.scrollTop());
    this.hideOnScroll();
    pixalsDown = $(window).scrollTop();
  },
  hideOnScroll: function() {
    if (pixalsDown >= this.$win.scrollTop() || this.$sidebar.hasClass('sidebar--open')) {
        this.$header.css({ 'top': 0, 'position': 'fixed'});
    } else {
        $('nav').css({'top': '-67px', 'position': 'fixed'});
    }
  }
};

$(document).ready(stickyNav.init());

/****** Search Bar ******/


var searchBar = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$container = $('.search-bar');
    this.$btn = $('.search-button');
    this.$input = $('.input-bar');
    this.$items = $('.-item, .-btn');
    this.$trigger = $('.toggle-nav-method');
  },
  bindEvents: function() {
    this.$trigger.on('click', this.handleClick.bind(this));
  },
  handleClick: function() {
    this.calculateWidth();
    this.expandSearch();
    this.hideNavItems();
    this.setInputWidth();
    this.dynamicTooltip();
  },
  expandSearch: function() {
    this.$trigger.toggleClass('active');
    this.$input.toggleClass('active');
    this.$btn.toggleClass('active');
    this.$input.focus();
  },
  dynamicTooltip: function() {
    if (this.$trigger.hasClass('active')) {
      this.$trigger.attr('data-original-title', 'Navigation Menu');
    } else {
      this.$trigger.attr('data-original-title', 'Search');
    }  
  },
  hideNavItems: function() {
    this.$items.toggleClass('hide');
  },
  calculateWidth: function() {
    width = 0;
    this.$items.each(function() {
      width += $(this).outerWidth(true);
    });
    console.log(width);
  },
  setInputWidth: function() {
    this.$input.width(width-60);
  }
}

$(document).ready(searchBar.init());

/****** Sidebar ******/

var sidebar = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$btn = $('#guideButton');
    this.$guide = $('.sidebar');
    this.$container = $('.page-wrapper');
  },
  bindEvents: function() {
    this.$btn.on('click', this.toggleDrawer.bind(this));
  },
  toggleDrawer: function() {
    this.$guide.toggleClass('sidebar--open');
    this.$container.toggleClass('page-wrapper--contract');
    // Reset CSS varialbes
    if (this.$guide.hasClass('sidebar--open')) {
      document.documentElement.style.setProperty('--seriesDrawerWidth', '256px');
    } else {
      document.documentElement.style.setProperty('--seriesDrawerWidth', '0px');
    }
  },
  changeButton: function() {
    this.$btn.toggleClass('guideButton--change');
  }
};

$(document).ready(sidebar.init());

/****** Sidebar Width Page Adjustments ******/

// var mediaQuery = {
//   init: function() {
//     this.cacheDom();
//     this.bindEvents();
//   },
//   cacheDom: function() {
//     this.$sidebar = $('.sidebar');
//   },
//   bindEvents: function() {
//     window.matchMedia("(max-width:1024px)").addListener(this.matchQuery);
//   },
//   matchQuery: function() {
//     if (window.matchMedia("(max-width:1024px)").matches) {
//       document.documentElement.style.setProperty('--seriesDrawerWidth', '0px');
//     } else {
//       if (this.$sidebar.hasClass('sidebar--open')) {
//         document.documentElement.style.setProperty('--seriesDrawerWidth', '0px');
//       } else {
//         document.documentElement.style.setProperty('--seriesDrawerWidth', '256px');
//       }
//     }
//   },
// };

// $(document).ready(mediaQuery.init());

$(document).ready(function() {
  function myFunction(mediaNavMediaQuery) {

    if (mediaNavMediaQuery.matches) { // If media query matches
        document.documentElement.style.setProperty('--seriesDrawerWidth', '0px');
    } else {
        if ($('.sidebar').hasClass('sidebar--open')) document.documentElement.style.setProperty('--seriesDrawerWidth', '256px');
        else{document.documentElement.style.setProperty('--seriesDrawerWidth', '0px')}
    }
  }
  
  var mediaNavMediaQuery = window.matchMedia("(max-width:1024px)")
  myFunction(mediaNavMediaQuery) // Call listener function at run time
  mediaNavMediaQuery.addListener(myFunction) // Attach listener function on state changes


  
});

/****** Sidebar ******/

var mobileNav = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$nav = $('.main-nav');
    this.$btn = this.$nav.find('#mobileMenuButton');
    this.$menu = this.$nav.find('.mobile-nav-items');
  },
  bindEvents: function() {
    this.$btn.on('click', this.callFunctions.bind(this));
  },
  callFunctions: function() {
    this.expandMenu()
    this.showItems()
  },
  expandMenu: function() {
    this.$nav.toggleClass('main-nav--expand');
  },
  showItems: function() {
    this.$menu.toggleClass('reveal')
  },
  changeButton: function() {
    this.$btn.toggleClass('guideButton--change');
  }
};

$(document).ready(mobileNav.init());

/* ===== GENERIC PAGES ===== */

/****** Author Modal ******/

var modal = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$body = $('body');
    this.$btn = $('.resource-header__author');
    this.btn = document.getElementById('modal');
    this.$modal = $('.author-modal');
    this.$exit = $('.author-modal__exit');
  },
  bindEvents: function() {
    this.$btn.on('click', this.openModal.bind(this));
    this.$exit.on('click', this.closeModal.bind(this));
  },
  transformOrigin: function() {
    var rect = this.btn.getBoundingClientRect();
    var pix = ((rect.right + rect.left)/2)+"px"+" "+((rect.top + rect.bottom) / 2)+"px";
    this.$modal.css('transform-origin', pix);
  },
  openModal: function() {
    this.transformOrigin();
    this.$modal.addClass('open display-elements');
    this.$body.addClass('hide-scroll');
  },
  closeModal: function() {
    this.$modal.removeClass('open display-elements');
    this.$body.removeClass('hide-scroll');
  }
}

$(document).ready(modal.init());

/****** User Dropdown Menu ******/

var userMenu = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$container = $('.nav-item.dropdown');
    this.$btn = this.$container.find('#avatar-btn');
    this.$dropdown = this.$container.find('.user-dropdown');
    this.btn = document.getElementById('avatar-btn');
    this.dropdown = document.getElementById('user-dropdown');
  },
  bindEvents: function() {
    this.$btn.on('click', this.toggleMenu.bind(this));
  },
  toggleMenu: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.$dropdown.toggleClass('show');
    this.toggleListener();
  },
  jQueryClose: function() {
    // TODO: Learn how to close on outside click with jQuery.
    if($dropdown.has(e.target).length === 0){
      $dropdown.removeClass('show');
    } else {
      $(document).one('click', closeMenu);
    }
  },  
  collapseMenu: function(e) {
    if (
      e.target.parentNode != this.btn &&
      !this.dropdown.contains(e.target)
      ) {
      this.$dropdown.removeClass('show');
      // this.dropdown.classList.remove("show");
    }
  },
  toggleListener: function() {
    // Add event listener only when menu is open.
    let i = 1
    if (i == 1) {
      // If menu is open, listen.
      window.addEventListener('click', this.collapseMenu.bind(this));
      i = 0;
    } else {
      // Otherwise remove listener.
      window.removeEventListener('click', this.collapseMenu.bind(this));
      i = 1;
    }
  }
}

$(document).ready(userMenu.init());

/****** Content Creation Menu ******/

var resourceMenu = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$menu = $('.user-dropdown');
    this.$btn = this.$menu.find('#add-resource');
    this.$defMenu = this.$menu.find('.default-user-menu');
    this.$rsMenu = this.$menu.find('.add-resource-menu');
    this.$rsBtn = this.$rsMenu.find('button');
  },
  bindEvents: function() {
    this.$btn.on('click', this.switchMenu.bind(this));
    this.$rsBtn.on('click', this.back.bind(this));
  },
  switchMenu: function() {
    this.$defMenu.addClass('hidden');
    this.$rsMenu.removeClass('hidden');
  },
  back: function() {
    this.$defMenu.removeClass('hidden');
    this.$rsMenu.addClass('hidden');
  }
}

$(document).ready(resourceMenu.init());

/* ===== VIDEO PAGE ===== */

/****** Course Menu Toggle Transition (max-height CSS issue) ******/

var courseMenu = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$sidebar = $('.sidebar');
    this.$courseBtn = this.$sidebar.find('#course-btn');
    this.$course = this.$sidebar.find('.course-menu');
  },
  bindEvents: function() {
    this.$courseBtn.on('click', this.toggleMenu.bind(this));
  },
  collapseSection: function(element) {
    var sectionHeight = element.scrollHeight;
    var elementTransition = element.style.transition;
    element.style.transition = '';

    requestAnimationFrame(function() {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;
      
      requestAnimationFrame(function() {
        element.style.height = 0 + 'px';
      });
    });
    element.setAttribute('data-collapsed', 'true');
  },
  expandSection: function(element) {
    var sectionHeight = element.scrollHeight;

    element.style.height = sectionHeight + 'px';
    element.addEventListener('transitionend', function(e) {
      element.removeEventListener('transitionend', arguments.callee);
      element.style.height = null;
    });
    element.setAttribute('data-collapsed', 'false');
  },
  toggleMenu: function(e) {
    // this.$course.toggleClass('sidebar__container--closed');
    var section = document.querySelector('.sidebar__container.course-menu');
    var isCollapsed = section.getAttribute('data-collapsed') === 'true';
    
    if(isCollapsed) {
      this.expandSection(section)
      section.setAttribute('data-collapsed', 'false')
    } else {
      this.collapseSection(section)
    }
    this.changeBtn();
  },
  changeBtn: function() {
    this.$courseBtn.toggleClass('sidebar__item--open');
  }
};

$(document).ready(courseMenu.init());

/****** Audio / Video Pages || Single Page Application Hash ******/

var hashApp = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
    this.onRefresh();
  },
  cacheDom: function() {
    this.$hashContent = $('.media-container');
    this.$vbtn = $('.media-menu__link[href="#full-video"]');
    this.$abtn = $('.media-menu__link[href="#full-audio"]');
    this.$win = $(window);
  },
  bindEvents: function() {
    this.$win.on('hashchange', this.showPage.bind(this));
  },
  showPage: function() {
    // Only hide the $hashContent if its sibling is taking its place. (Don't hide on generic #)
    if (location.hash === this.$vbtn.attr('href') || location.hash === this.$abtn.attr('href')) {
      this.$hashContent.hide();
    }
    // Select the HTML element whose id is identical with the hash. $(#full-video).
    // TODO: Move browser to the top of the page.
    $(location.hash).show();
    // Change the button colors.
    this.changeBtn();
  },
  changeBtn: function() {
    // If the href attribute of $vbtn is identical to the URL hash (#full-video === #full-video), apply the following code.
    if (location.hash === this.$vbtn.attr('href')) {
      // Set the video button colors to show it's selected.
      this.$vbtn.addClass('media-menu__link--selected');
      // Set the audio button colors to show it isn't selected.
      this.$abtn.removeClass('media-menu__link--selected');
    // If the href attribute of $abtn is identical to the URL hash (#full-audio === #full-audio), apply the following code.
    } else if (location.hash === this.$abtn.attr('href')) {
      // Set the audio button colors to show it's selected.
      this.$abtn.addClass('media-menu__link--selected');
      // Set the video button colors to show it isn't selected.
      this.$vbtn.removeClass('media-menu__link--selected');
    }
  },
  onRefresh: function() {
    if (location.hash === '#full-audio') {
      $('#full-audio').show();
      $('#full-video').hide();
      this.changeBtn();
    }
  }
};

$(document).ready(hashApp.init());

/****** Show Download Sub Menu ******/

var downloadSub = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$btn = $('#media-menu__download');
    this.btn = document.getElementById('media-menu__download');
    this.$menu = this.$btn.find('.media-menu__sub');
    this.$win = $(window);
  },
  bindEvents: function() {
    this.$btn.on('click', this.openMenu.bind(this));
    this.$win.on('click', this.collapseMenu.bind(this));
  },
  openMenu: function() {
    this.$menu.addClass('selected');
  },
  collapseMenu: function() {
    if (
      event.target != this.btn &&
      event.target.parentNode != this.btn
    ) {
      this.$menu.removeClass('selected');
    }
  }
}

$(document).ready(downloadSub.init());

/****** _____ Video Page _____ ******/

/****** Remove Related Videos ******/
var hideRel = {
  init: function() {
    this.cacheDom();
    this.clickExit();
    this.removePanel();
  },
  cacheDom: function() {
    this.$btn = $('#guideButton');
    this.$iframeWrapper = $('.aspect-ratio');
    this.$content = this.$iframeWrapper.contents().find('.ytp-pause-overlay');
    this.$exitBtn = this.$iframeWrapper.contents().find('.ytp-collapse');
    this.$overlay = $('.ytp-pause-overlay');
  },
  removePanel: function() {
    this.$content.remove();
  },
  clickExit: function() {
    this.$exitBtn.click();
  }
};

$(document).ready(hideRel.init());

/****** _____ Audio Page _____ ******/

/****** Toggle Audio Player ******/

var togglePlay = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.audio = document.getElementById('audio-element');
    this.$btn = $('.audio-player__playpause-button');
    this.$btnElement = this.$btn.find(':button');
    isPlaying = false;
  },
  bindEvents: function() {
    this.$btnElement.on('click', this.toggleAudio.bind(this));
    // this.audio.onplaying = this.play.bind(this);
    // this.audio.onpause = this.pause.bind(this);
    // this.audio.onended = this.end.bind(this);
    this.audio.onplaying = function() {isPlaying = true;};
    this.audio.onpause = function() {isPlaying = false;};
    this.audio.onended = function() {
      isPlaying = false;
      this.audio.currentTime = 0;
      $btn.removeClass('audio-player__pause');
    };
  },
  toggleAudio: function() {
    if (isPlaying) {
      this.audio.pause();
      this.$btn.removeClass('audio-player__pause');
      // isPlaying = false;
    } else {
      this.audio.play();
      this.$btn.addClass('audio-player__pause')
      // isPlaying = true;
    }
  },
  // play: function() {
  //   isPlaying = true;
  // },
  // pause: function() {
  //   isPlaying = false;
  // },
  // end: function() {
  //   isPlaying = false;
  //   this.audio.currentTime = 0;
  //   $btn.removeClass('audio-player__pause');
  // }
}

$(document).ready(togglePlay.init());

/****** Local Variables ******/

var audio = {
  cacheDom: function() {
    this.$controls = $('.audio-player__controls');
    this.$volumeSlider = this.$controls.find('#audio-player__volume-range')
    this.$vol = this.$controls.find('.audio-player__volume-current');
    this.element = document.getElementById('audio-element');
    this.volumeSlider = document.getElementById('audio-player__volume-range');
    this.volumeHandleDiameter = parseInt(getComputedStyle(document.body).getPropertyValue('--volumeHandleDiameter'), 10);
    this.seekSlider = document.getElementById('audio-player__range');
    this.$seekSlider = this.$controls.find('#audio-player__range');
    this.$seekTotal = this.$controls.find('#audio-player__time-total');
  }
}

$(document).ready(audio.cacheDom());

/****** Toggle Mute ******/

var toggleMute = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$btn = audio.$controls.find('.audio-player__mute-button');
    this.duration =  audio.element.duration;
    this.cachedVolume;
  },
  bindEvents: function() {
    this.$btn.on('click', this.toggle.bind(this));
  },
  toggle: function() {
    if(audio.element.muted == true) {
      audio.volumeSlider.value = this.cachedVolume;  // set volume to previous value
      audio.element.muted = false;
      audio.$vol.css('width', (audio.volumeSlider.clientWidth * this.cachedVolume / audio.volumeSlider.max) - (this.cachedVolume / audio.volumeSlider.max * audio.volumeHandleDiameter));
    }
    else{
      this.cachedVolume = audio.volumeSlider.value;  // store value of volume in another variable
      audio.element.muted = true;
      audio.volumeSlider.value = 0;
      audio.$vol.css('width', 0);
    }
    this.$btn.toggleClass('mejs-mute');
    this.$btn.toggleClass('mejs-unmute');
  }
}

$(document).ready(toggleMute.init());

/****** Volume Loud ******/

var volumeMax = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$btn = audio.$controls.find('.audio-player__loud-button');
  },
  bindEvents: function() {
    this.$btn.on('click', this.maxVolume.bind(this));
  },
  maxVolume: function() {
    audio.element.muted = false;
    audio.volumeSlider.value = 100;
    audio.$vol.css('width', (audio.volumeSlider.clientWidth * 100 / audio.volumeSlider.max) - (100 / audio.volumeSlider.max * audio.volumeHandleDiameter));
    audio.element.volume = audio.volumeSlider.value / 100;
  }
}

$(document).ready(volumeMax.init());

/****** Volume Indicator ******/

var volumeIndicator = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    sliderPos = audio.volumeSlider.value / audio.volumeSlider.max;
    pixelPostion = audio.volumeSlider.clientWidth * sliderPos;
  },
  bindEvents: function() {
    audio.$volumeSlider.on('input', this.movePosition.bind(this));
  },
  movePosition: function() {
    audio.$vol.css('width', (audio.volumeSlider.clientWidth * audio.volumeSlider.value / audio.volumeSlider.max) - (audio.volumeSlider.value / audio.volumeSlider.max * audio.volumeHandleDiameter));
    audio.element.muted = false;
  }
}

$(document).ready(volumeIndicator.init());

/****** Link Slider To Audio Volume ******/

var volumeChange = {
  init: function() {
    this.setInitialVolume();
    this.bindEvents();
  },
  setInitialVolume: function() {
    audio.element.volume = audio.volumeSlider.value / 100;
  },
  bindEvents: function() {
    audio.volumeSlider.addEventListener('mousemove', this.setVolume);
    audio.volumeSlider.addEventListener('click', this.setVolume);
  },
  setVolume: function() {
    audio.element.volume = audio.volumeSlider.value / 100;
  }
}

$(document).ready(volumeChange.init());

/****** Seek Slider ******/

var seekSlider = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    seeking = false;
  },
  bindEvents: function() {
    // TODO: Bind Mousedown and Touchstart, etc.
    audio.seekSlider.addEventListener('mousedown', this.clickSeeking.bind(this));
    audio.seekSlider.addEventListener('mousemove', this.dragSeeking.bind(this));
    audio.seekSlider.addEventListener('mouseup', this.doneSeeking.bind(this));
    audio.seekSlider.addEventListener('touchstart', this.clickSeeking.bind(this));
    audio.seekSlider.addEventListener('touchmove', this.dragSeeking.bind(this));
    audio.seekSlider.addEventListener('touchend', this.doneSeeking.bind(this));
  },
  seek: function(event) {
    // Determine where to look for clientX by the event type (mousedown or touchstart).
    var eventType = event.type.toLowerCase();
    var clientX = (eventType === 'mousedown' || eventType === 'mousemove' || eventType === 'mouseup')
                ? event.clientX
                : event.touches[0].clientX;

    if(seeking && audio.element.duration > 0) { // Wait for duration to load before invoking
      audio.seekSlider.value = (clientX - audio.$seekSlider.offset().left) / audio.seekSlider.offsetWidth * audio.seekSlider.max;
      seekto = audio.element.duration * (audio.seekSlider.value / audio.seekSlider.max);
      audio.element.currentTime = seekto; 
    }
  },
  clickSeeking: function(event) {
    seeking=true;
    this.seek(event);
  },
  dragSeeking: function(event) {
    this.seek(event);
  },
  doneSeeking: function() {
    seeking=false;
  }
}

$(document).ready(seekSlider.init());

/****** Time Downloaded ******/

var timeBuffered = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.loaded = document.getElementById('audio-player__time-loaded');
  },
  bindEvents: function() {
    audio.element.addEventListener('progress', this.render.bind(this));
  },
  render: function() {
    if (audio.element.duration > 0) {
      for (var i = 0; i < audio.element.buffered.length; i++) {
        if (audio.element.buffered.start(audio.element.buffered.length - 1 - i) < audio.element.currentTime) {
          this.loaded.style.width = (audio.element.buffered.end(audio.element.buffered.length - 1 - i) / audio.element.duration) * 100 + "%";
          break;
        }
      }
    }
  }
}

$(document).ready(timeBuffered.init());

/****** Time Current Indicator ******/

var timeCurrentIndicator = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$current = audio.$controls.find('.audio-player__time-current');
  },
  bindEvents: function() {
    audio.$seekSlider.on('input', this.setIndicator.bind(this));
    audio.element.addEventListener('timeupdate', this.setIndicator.bind(this));
  },
  setIndicator: function() {
    if (audio.element.duration > 0) {
      this.$current.css('width', (audio.seekSlider.value / audio.seekSlider.max) * audio.$seekTotal.width());
    }
  }
}

$(document).ready(timeCurrentIndicator.init());

/****** Time Float ******/

var timeBubble = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$bubble = $('.audio-player__time-float')
    this.$time = this.$bubble.find('.audio-player__time-float-content');
  },
  bindEvents: function() {
    audio.$seekTotal.on('mousemove', this.getTime.bind(this));
    audio.$seekSlider.on('mousemove', this.floatPosition.bind(this));
    audio.$seekSlider.on('mouseleave', this.hideFloat.bind(this));
  },
  getTime: function(e) {
    var mousemoveValue = (e.clientX - audio.$seekSlider.offset().left) / audio.seekSlider.offsetWidth * audio.seekSlider.max,
        bubmins = Math.floor( audio.element.duration * (mousemoveValue / audio.seekSlider.max) / 60),
        bubsecs = Math.floor( audio.element.duration * (mousemoveValue / audio.seekSlider.max) - bubmins * 60);
    if(bubmins < 10){ bubmins = '0'+bubmins; }
    if (isNaN(bubmins)){ bubmins = '00';}
    if(bubsecs < 10){ bubsecs = '0'+bubsecs; }
    if (isNaN(bubsecs)){ bubsecs = '00';}
    this.$time.html(bubmins+':'+bubsecs);
  },
  floatPosition: function(e) {
    this.$bubble.css({
      'display': 'inline',
      'left': e.clientX - audio.$seekTotal.offset().left
    });
  },
  hideFloat: function() {
    this.$bubble.css('display', 'none');
  }
}

$(document).ready(timeBubble.init());

/****** Time Elapsed / Remaining Update ******/

var seekTimeUpdate = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$elapsed = audio.$controls.find('.audio-player__elapsed');
    this.$remaining = audio.$controls.find('.audio-player__remaining');
  },
  bindEvents: function() {
    audio.element.addEventListener('timeupdate', this.handleTimeupdate.bind(this));
  },
  handleTimeupdate: function() {
    this.moveSliderThumb();
    this.renderHTML();
  },
  moveSliderThumb: function() {
    var numbersPerPx = audio.seekSlider.max / (audio.$seekTotal.width()+audio.volumeHandleDiameter),
        marginNumbers = numbersPerPx * audio.volumeHandleDiameter,
        offsetFactor = marginNumbers / audio.element.duration,
        half = marginNumbers / 2,
        newTime = (audio.element.currentTime / audio.element.duration) * audio.seekSlider.max - half + (audio.element.currentTime * offsetFactor);
    
    audio.seekSlider.value = newTime;
  },
  renderHTML: function() {
    var curmins = Math.floor(audio.element.currentTime / 60),
        cursecs = Math.floor(audio.element.currentTime - curmins * 60),
        remmins = Math.floor((audio.element.duration - audio.element.currentTime) / 60),
        remsecs = Math.floor((audio.element.duration - audio.element.currentTime) - remmins * 60);
    
    if(cursecs < 10){ cursecs = '0'+cursecs; }
    if(curmins < 10){ curmins = '0'+curmins; }
    if(remmins < 10){ remmins = '0'+remmins; }
    if(remsecs < 10){ remsecs = '0'+remsecs; }
    this.$elapsed.html(curmins+':'+cursecs);
    this.$remaining.html('-'+remmins+':'+remsecs);
  }
}

$(document).ready(seekTimeUpdate.init());

/****** Get Time Elapsed / Remaining Immediately On Click Before Time Updates ******/

var clickTimeUpdate = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$elapsed = audio.$controls.find('.audio-player__elapsed');
    this.$remaining = audio.$controls.find('.audio-player__remaining');
  },
  bindEvents: function() {
    audio.$seekSlider.on('click', this.renderHTML.bind(this));
  },
  renderHTML: function(e) {
    var duration =  audio.element.duration;
    if (duration > 0) {
    var mousemoveValue = (e.clientX - audio.$seekSlider.offset().left) / audio.seekSlider.offsetWidth * audio.seekSlider.max,
        curmins = Math.floor(duration * (mousemoveValue / audio.seekSlider.max) / 60),
        cursecs = Math.floor(duration * (mousemoveValue / audio.seekSlider.max) - curmins * 60),
        remmins = Math.floor((duration - duration * (mousemoveValue / audio.seekSlider.max)) / 60),
        remsecs = Math.floor((duration - duration * (mousemoveValue / audio.seekSlider.max)) - remmins * 60);
    if(cursecs < 10){ cursecs = '0'+cursecs; }
    if(curmins < 10){ curmins = '0'+curmins; }
    if(remmins < 10){ remmins = '0'+remmins; }
    if(remsecs < 10){ remsecs = '0'+remsecs; }
  
    this.$elapsed.html(curmins+':'+cursecs);
    this.$remaining.html('-'+remmins+':'+remsecs);
    }
  }
}

$(document).ready(clickTimeUpdate.init());

/****** Get Duration On Page Load ******/

var renderMetadata = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$remaining = audio.$controls.find('.audio-player__remaining');
  },
  bindEvents: function() {
    audio.element.addEventListener('loadedmetadata', this.renderHTML.bind(this));
  },
  renderHTML: function() {
    var durmins = Math.floor(audio.element.duration / 60),
        dursecs = Math.floor(audio.element.duration - durmins * 60);
    if(durmins < 10){ durmins = '0'+durmins; }
    if(dursecs < 10){ dursecs = '0'+dursecs; }
    this.$remaining.html('-'+durmins+':'+dursecs);
  }
}

$(document).ready(renderMetadata.init());

/****** Speed Controller ******/

var speedMenu = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$btn = audio.$controls.find('.audio-player__playback-speed');
    this.btn = document.getElementById('audio-player__playback-speed');
    this.menu = document.getElementById('speed-menu');
  },
  bindEvents: function() {
    this.$btn.on('click', this.toggleMenu.bind(this));
    window.addEventListener('click', this.collapseMenu.bind(this));
  },
  toggleMenu: function(e) {
    if (this.menu.style.display === 'none') {
      this.menu.style.display = 'grid';
    } else if (e.target.parentNode != this.menu) {
      this.menu.style.display = 'none';
    }
  },
  collapseMenu: function(e) {
    if (
      e.target.parentNode != this.btn &&
      e.target.parentNode != this.menu
      ) {
      this.menu.style.display = 'none';
    }
  }
}

$(document).ready(speedMenu.init());

/****** Playback Speed Rates ******/

var speedRates = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$opt = audio.$controls.find('.speed-menu option');
    this.$active = $('.speed-menu--active');
  },
  bindEvents: function() {
    this.$opt.on('click', this.handleClick.bind(this));
    $(document).on('keydown', this.keyBindings.bind(this));
  },
  handleClick: function(e) {
    this.changeSpeed(e);
    this.changeHighlight(e);
  },
  changeSpeed: function(e) {
    audio.element.playbackRate = e.target.value;
  },
  changeHighlight: function(e) {
    this.$opt.removeClass('speed-menu--active');
    e.target.classList.add('speed-menu--active');
  },
  keyBindings: function(e) {
    console.log('It worked!');
    var key_press = String.fromCharCode(e.keyCode);
    var key_code = e.keyCode;
    if(key_press == "k" && audio.element.playbackRate < 16){
      audio.element.playbackRate = audio.element.playbackRate + .25;
      console.log('Nice try. Oh--actually it worked. Playback speed is now ' + audio.element.playbackRate);
    } else if(key_press == "m" && audio.element.playbackRate > .25) {
      audio.element.playbackRate = audio.element.playbackRate - .25;
      console.log('How clever. Playback speed is now ' + audio.element.playbackRate);
    } else if(key_press == "D" && audio.element.playbackRate < 16) {
      audio.element.playbackRate = audio.element.playbackRate + .10;
    } else if(key_press == "S" && audio.element.playbackRate > .10) {
      audio.element.playbackRate = audio.element.playbackRate - .10;
    } else if(key_press == "G") {
      audio.element.playbackRate = 1.8;
    } else if(key_press == " ") {
      togglePlay.toggleAudio();
    } else if(key_press == "%") {
      audio.element.currentTime = audio.element.currentTime - 5;
    } else if(key_press == "'") {
      audio.element.currentTime = audio.element.currentTime + 5;
    } else if(key_press == "&" && audio.element.volume < 1) {
      audio.element.volume = audio.element.volume + .05;
      audio.volumeSlider.value = audio.element.volume * 100;
      volumeIndicator.movePosition();
    } else if(key_press == "(" && audio.element.volume > 0) {
      audio.element.volume = audio.element.volume - .05;
      audio.volumeSlider.value = audio.volumeSlider.value - 5;
      volumeIndicator.movePosition();
    } 
    this.$active.html(audio.element.playbackRate);
    this.$active.val(audio.element.playbackRate);
    this.$opt.removeClass('speed-menu--active');
    this.$active.addClass('speed-menu--active');
  }
}

$(document).ready(speedRates.init());

/****** Share Panel ******/

var sharePanel = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function() {
    this.$btn = $('.sharing-footer__button');
    this.$menu = $('.sharing-footer__options');
    this.$html = $('html');
  },
  bindEvents: function() {
    this.$btn.on('click', this.toggleMenu.bind(this));
    this.$html.on('click', this.closeMenu.bind(this));
  },
  toggleMenu: function(e) {
    this.$menu.toggleClass('active');
    this.$btn.toggleClass('active');
    e.stopPropagation();
  },
  closeMenu: function() {
    this.$menu.removeClass('active');
    this.$btn.removeClass('active');
  }
}

$(document).ready(sharePanel.init());



// Ajax Delete Article Request
$(document).ready(function(){
  $('.delete-article').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/articles/'+id,
      success: function(response){
        alert('Deleting Article');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});

// Bootstrap popper.js tooltops
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

// Resize SELECT element based on OPTION width
$(document).ready(function() {
 $('#dynamic-resizing').change(function(){
    $("#option-width").html($('#dynamic-resizing option:selected').text());
    $(this).width($("#select-width").width());
 });
});

// Resize INPUT element based on VALUE Width
function resizeInput() {
  if($(this).val()=='' || $(this).val()==null){
    $(this).attr('size', $(this).attr('placeholder').length);
  } else {
    $(this).attr('size', $(this).val().length)*.75;
  }
}

$('.settings-item')
    // event handler
    .keydown(resizeInput)
    // resize on page load
    .each(resizeInput);

// Open / Close Reset Passwords
$(document).ready(function(){
  $('#password').parent().parent().click(function(){
    $('#reset-password').toggleClass('hidden');
  });
});


// Toggle Menu Drawer
$('.extra-menu__drawer-Btn').click(function() {
  $('.extra-menu__drawer').toggleClass('extra-menu__drawer--open');
  $(this).toggleClass('open');
})


// Exit menu on outside click
window.addEventListener('mouseup', function(event){
  var box = document.getElementById('extra-menu__drawer');
  var boxBtn = document.getElementById('extra-menu__drawer-Btn');
  if (event.target != box && event.target.parentNode != box && event.target != boxBtn && $('.extra-menu__drawer').hasClass('extra-menu__drawer--open')){
        $('.extra-menu__drawer').removeClass('extra-menu__drawer--open');
        $('.extra-menu__drawer-Btn').removeClass('open');
    }
});