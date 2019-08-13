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
    this.$window.on('load', setTimeout(this.fade.bind(this), 700));
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

// Open / Collapse search background
// $(document).ready(function(){

//   $(".search-button").click(function(){
//     $(".search-button, .input-bar").toggleClass("active");
//     $("input[type='text']").focus();
//   });

// });




// // Share modal
// $('.share-footer__button').on('click', function() {
//   $('.share-footer__options').toggleClass('active');
//   $(this).toggleClass('active');
// });

// // Exit share menu on outside click
// $('html').click(function() {
//   $('.shareOptions').removeClass('-active');
//   $('.shareButton').removeClass('-active');
// });

// $('.shareButton').click(function(event){
//     event.stopPropagation();
// });

// // Open modal on click
// $('.resourceAuthor').on('click', function() {
//   var rect = document.getElementById('modal').getBoundingClientRect();
//   var pix = ((rect.right + rect.left)/2)+"px"+" "+((rect.top + rect.bottom) / 2)+"px";
//   $('.modal').css('transform-origin', pix);
//   $('.modal').addClass('open display-elements');
//   $('body').addClass('hide-scroll');
// });

// // Exit modal on click
// $('.closeModal').on('click', function() {
//   $('.modal').removeClass('open display-elements');
//   $('body').removeClass('hide-scroll');
// });

// });

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



// Show / Hide Navbar During Scroll (Sticky Navbar)
// $(document).ready(function() {          // Wait for the document to be ready
//   scrollPosition = 0;
//   $(document).scroll(function () {    // Event handler
//     if (scrollPosition > $(window).scrollTop() || $('.extra-menu__drawer').hasClass('extra-menu__drawer--open')) {$(".Header").css({ 'top': 0, 'position': 'fixed'})}  // If current scroll position is greater (farther down) than the top of the element (window), or if menu is open, apply the following css properties to .Header
//     else{$(".Header").css({'top': '-63px', 'position': 'fixed'})}  // Otherwise move .Header up 63px
//     scrollPosition = $(window).scrollTop();
//   });
// });

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

// Toggle Tutorial Nav Guide
// $(document).ready(function() {
// $('#guideButton').on('click', function() {
//   $('.sidebar, .navHeaderShadow').toggleClass('sidebar--open');
//   $('.page-wrapper').toggleClass('pageWithMediaNav--expand');  // Change Nav Guide Width Varialbe
//   $(this).toggleClass('guideButton--change');
//   if ($('.sidebar').hasClass('sidebar--open')) document.documentElement.style.setProperty('--seriesDrawerWidth', '0px'); // set guide width variable to 0 if closed
//   else{document.documentElement.style.setProperty('--seriesDrawerWidth', '256px')} // otherwise keep at 256px
// });
// });

// Make backdrop responsive
/*
var videoHeight=document.getElementById('video-player-container').style.height;
document.getElementById('video-spacer-container').style.height=videoHeight;
*/

// // Open / Collapse search background
// $(document).ready(function(){

//   $(".Search-Btn, .search-button").click(function(){
//     $(".search-button, .input-bar, .Search-Btn").toggleClass("active");
//     $("input[type='text']").focus();
//   });

// });

// $(document).ready(function(){
//     $('[data-toggle="tooltip"]').tooltip({
//       animation: true,
//       delay: {show: 500, hide: 100}
//     });
//     $('button').on('mousedown', function(){
//       $('[data-toggle="tooltip"]').tooltip('hide');
//     });
//     $('[data-toggle="tooltip"]').on('mouseleave', function(){
//       $('[data-toggle="tooltip"]').tooltip('hide');
//     });
// });

// // Single Page Application and Hashchange (URL Hash references -- full video || full audio)
// function showPage(pageId) {
// $(".media-container").hide();
// $(pageId).show();
// }

// location.hash = "";
// //location.hash = "#full-video";

// $(window).on("hashchange", function(){
// //console.log("Hash Changed!"+location.hash);
// showPage(location.hash);
// // Change Selected link
// $(".media-menu__link").each(function () {
//   if ($(this).attr("href") === location.hash) {
//     $(this).addClass("media-menu__link--selected");
//   } else {
//     $(this).removeClass("media-menu__link--selected");
//   }
// })
// });

// Show Download Sub Menu on click
// $(document).ready(function(){

// $(".media-menu__item--download").click(function(){
//   $(".media-menu--sub").addClass("selected");
// });

// });

// window.addEventListener('mouseup', function(event){
// var dwnld = document.getElementById('media-menu__item--download');
// if (event.target != dwnld && event.target.parentNode != dwnld){
//       $('.media-menu--sub').removeClass('selected');
//   }
// });

// Toggle variable Width

// Toggle Audio on play playButton
/*
var myAudio = document.getElementById("myAudio");
var isPlaying = false;

function togglePlay() {
if (isPlaying) {
  myAudio.pause()
} else {
  myAudio.play();
}
};
myAudio.onplaying = function() {
isPlaying = true;
};
myAudio.onpause = function() {
isPlaying = false;
};
*/

// Toggle Play/Pause Buttons
// var togglePlay; // set variable outside of function to make scope global; otherwise replace "togglePlay = function ()" with "function togglePlay()"
// $(document).ready(function() {
// var myAudio = document.getElementById('myAudio');
// var isPlaying = false;

// togglePlay = function () {
//   if (isPlaying) {
//     myAudio.pause();
//     $('.mejs-playpause-button').removeClass('mejs-pause');
//   } else {
//     myAudio.play();
//     $('.mejs-playpause-button').addClass('mejs-pause')
//   }
// };
// myAudio.onplaying = function() {
//   isPlaying = true;
// };
// myAudio.onpause = function() {
//   isPlaying = false;
// };
// myAudio.onended = function() {
//   isPlaying = false;
//   myAudio.currentTime = 0;
//   $('.mejs-playpause-button').removeClass('mejs-pause');
// };
// });

/* add event listener to replace html
$(document).ready(function() {
$('.mejs-playpause-button').on('click', togglePlay());
});
*/

//Toggle mute
//var muteButton = document.getElementById('')

// $(document).ready(function() {

// var volumeslider = document.getElementById("mejs-horizontal-volume-input"),
//     volumeHandleDiameter = parseInt(getComputedStyle(document.body).getPropertyValue('--volumeHandleDiameter'), 10),
//     myAudio = document.getElementById('myAudio'),
//     duration =  myAudio.duration,
//     cachedVolume;
// // Toggle mute
// $('.mejs-volume-button').on('click', function(){
//   if(myAudio.muted == true) {
//     volumeslider.value = cachedVolume;  // set volume to previous value
//     myAudio.muted = false;
//     $('.audio-player__volume-current').css('width', (volumeslider.clientWidth * cachedVolume / volumeslider.max) - (cachedVolume / volumeslider.max * volumeHandleDiameter));
//   }
//   else{
//     cachedVolume = volumeslider.value;  // store value of volume in another variable
//     myAudio.muted = true;
//     volumeslider.value = 0;
//     $('.audio-player__volume-current').css('width', 0);
//   }
//   $('.mejs-volume-button').toggleClass('mejs-mute');
//   $('.mejs-volume-button').toggleClass('mejs-unmute');
// });

// Volume Loud / Max Button
// $('.mejs-loud-button').on('click', function(){
//     myAudio.muted = false;
//     volumeslider.value = 100;  // set volume to previous value
//     $('.audio-player__volume-current').css('width', (volumeslider.clientWidth * 100 / volumeslider.max) - (100 / volumeslider.max * volumeHandleDiameter));
//     myAudio.volume = volumeslider.value / 100;
// });


// Volume current indicator

// var sliderPos = volumeslider.value / volumeslider.max,
//     pixelPostion = volumeslider.clientWidth * sliderPos;

// $('#audio-player__volume-range').on('input', function() {
//     $('.audio-player__volume-current').css('width', (volumeslider.clientWidth * volumeslider.value / volumeslider.max) - (volumeslider.value / volumeslider.max * volumeHandleDiameter));
//     myAudio.muted = false;
// });

// Link input value with Audio Value
// volumeslider.addEventListener("mousemove", setvolume);
// volumeslider.addEventListener("click", setvolume);
// function setvolume(){
//   myAudio.volume = volumeslider.value / 100;
// }
// Seek slider
// var seeking = false;
// seekslider = document.getElementById("mejs-time-input");
// seekslider.addEventListener("mousedown", function(event){ seeking=true; seek(event); });
// seekslider.addEventListener("mousemove", function(event){ seek(event); });
// seekslider.addEventListener("mouseup",function(){ seeking=false; });
// function seek(event){
//     if(seeking && myAudio.duration > 0){
//       seekslider.value = (event.clientX - $("#audio-player__range").offset().left) / seekslider.offsetWidth * seekslider.max;
//         seekto = myAudio.duration * (seekslider.value / seekslider.max);
//         myAudio.currentTime = seekto; //current time needs to load before invoked
//     }
// //    console.log((event.clientX - seekslider.offsetLeft) / 879 * 100);
// //    console.log(seekslider.offsetWidth);
//   }

// Time update

// myAudio.addEventListener("timeupdate", function(){ seektimeupdate(); });

// function seektimeupdate(){
// //		var newTime = (myAudio.currentTime / myAudio.duration) * seekslider.max;

//   var numbersPerPx = seekslider.max / ($("#audio-player__time-total").width()+volumeHandleDiameter),
//       marginNumbers = numbersPerPx * volumeHandleDiameter,
//       offsetFactor = marginNumbers / myAudio.duration,
//       half = marginNumbers / 2,
//       newTime = (myAudio.currentTime / myAudio.duration) * seekslider.max - half + (myAudio.currentTime * offsetFactor);
//   seekslider.value = newTime;
//   var curmins = Math.floor(myAudio.currentTime / 60),
//       cursecs = Math.floor(myAudio.currentTime - curmins * 60),
//       remmins = Math.floor((myAudio.duration - myAudio.currentTime) / 60),
//       remsecs = Math.floor((myAudio.duration - myAudio.currentTime) - remmins * 60);
//   if(cursecs < 10){ cursecs = "0"+cursecs; }
//   if(curmins < 10){ curmins = "0"+curmins; }
//   if(remmins < 10){ remmins = "0"+remmins; }
//   if(remsecs < 10){ remsecs = "0"+remsecs; }
//   $(".mejs-elapsed").html(curmins+":"+cursecs);
//   $(".mejs-remaining").html("-"+remmins+":"+remsecs);
// }

// // Instant time elapsed / Remaining
// $('#audio-player__range').on('click', function(e) {
//   var duration =  myAudio.duration;
//   if (duration > 0) {
//   var mousemoveValue = (e.clientX - $("#audio-player__range").offset().left) / seekslider.offsetWidth * seekslider.max,
//       curmins = Math.floor(duration * (mousemoveValue / seekslider.max) / 60),
//       cursecs = Math.floor(duration * (mousemoveValue / seekslider.max) - curmins * 60),
//       remmins = Math.floor((duration - duration * (mousemoveValue / seekslider.max)) / 60),
//       remsecs = Math.floor((duration - duration * (mousemoveValue / seekslider.max)) - remmins * 60);
//     if(cursecs < 10){ cursecs = "0"+cursecs; }
//     if(curmins < 10){ curmins = "0"+curmins; }
//     if(remmins < 10){ remmins = "0"+remmins; }
//     if(remsecs < 10){ remsecs = "0"+remsecs; }

//   $(".mejs-elapsed").html(curmins+":"+cursecs);
//   $(".mejs-remaining").html("-"+remmins+":"+remsecs);
//   }
// });

// // Time loaded / buffered / downloaded


// myAudio.onprogress = function() {

//   var duration =  myAudio.duration;
//   if (duration > 0) {
//     for (var i = 0; i < myAudio.buffered.length; i++) {
//       if (myAudio.buffered.start(myAudio.buffered.length - 1 - i) < myAudio.currentTime) {
//           document.getElementById("mejs-time-loaded").style.width = (myAudio.buffered.end(myAudio.buffered.length - 1 - i) / duration) * 100 + "%";
//           break;
//       }
//     }
//   }
// }

// // Time current indicator
// $('#audio-player__range').on('input', setTimeCurrent);
// myAudio.addEventListener('timeupdate', setTimeCurrent);
// $(window).resize(setTimeCurrent);

// function setTimeCurrent(){
//   var duration =  myAudio.duration;
//   if (duration > 0) {
//     $('.mejs-time-current').css('width', (seekslider.value / seekslider.max) * $("#audio-player__time-total").width());
//   }
// }

// Time bubble / tooltip / float
// $("#audio-player__time-total").on("mousemove", function(e) {
//   var mousemoveValue = (e.clientX - $("#audio-player__range").offset().left) / seekslider.offsetWidth * seekslider.max,
//       bubmins = Math.floor( myAudio.duration * (mousemoveValue / seekslider.max) / 60),
//       bubsecs = Math.floor( myAudio.duration * (mousemoveValue / seekslider.max) - bubmins * 60);
//   if(bubmins < 10){ bubmins = "0"+bubmins; }
//   if (isNaN(bubmins)){ bubmins = "00";}
//   if(bubsecs < 10){ bubsecs = "0"+bubsecs; }
//   if (isNaN(bubsecs)){ bubsecs = "00";}

//   $(".audio-player__time-float-content").html(bubmins+":"+bubsecs);

// });

// $("#audio-player__range").on("mousemove", function(e) {
//     $(".audio-player__time-float").css({"display": "inline", "left": e.clientX - $("#audio-player__time-total").offset().left});
// });

// $("#audio-player__range").on("mouseleave", function() {
//     $(".audio-player__time-float").css("display", "none");
// });

// // Get duration on page load

// myAudio.addEventListener('loadedmetadata', function() {
// var durmins = Math.floor( myAudio.duration / 60),
//     dursecs = Math.floor( myAudio.duration - durmins * 60);
// if(durmins < 10){ durmins = "0"+durmins; }
// if(dursecs < 10){ dursecs = "0"+dursecs; }
//   $(".mejs-remaining").html("-"+durmins+":"+dursecs);
// });

/*
myAudio.onload = function(){console.log(myAudio.duration)};

$("#myAudio").on("load", function() {
$(".mejs-remaining").html(myAudio.duration);
console.log(myAudio.duration);
});
*/

// Speed controller
// $('.playbackSpeed').on("click", function(event) {

//   var x = document.getElementById("speed-menu");

//   if (x.style.display === "none") {
//       x.style.display = "grid";
//   } else if (event.target.parentNode != x) {
//       x.style.display = "none";
//   }
// });

// // Exit playback speed menu on outside click
// var menu = document.getElementById('playbackSpeed');
// window.addEventListener('mouseup', function(event){
//   var menuBtn = document.getElementById('speed-menu');
//   if (event.target.parentNode != menu){
//       menuBtn.style.display = "none";
//   }
// });

// // Playback speed rates

// $('.playbackSpeed').children().on("click", function(event) {
// if (event.target.parentNode != menu){
// myAudio.playbackRate = event.target.value;
// }
// });

// // Highlight currently selected speed
// $('.speed-menu option').click(function(){
// $('.speed-menu option').removeClass("speed-menu--active");
// $(this).addClass("speed-menu--active");
// });

// // Play between points, play only part of audio
// var endTime,
//   startTime;

// // do this binding once at page load time


// myAudio.addEventListener("timeupdate", function() {
//   if(myAudio.currentTime >= endTime) {
//       myAudio.pause();
//   }

//   function playInterval () {
// //        myAudio.currentTime = start;
//       endTime = 1500;
// //      myAudio.play();
//   }
// });

// myAudio.addEventListener("onload", function() {
//   startTime = 1000;
//   myAudio.currentTime = startTime;
//   });


// plays the audioObj from start to stop times (in seconds)
// call this for each snippet you wish to play (e.g., in an onclick handler)
/*
function playInterval (audioObj, start, stop) {
    myAudio.currentTime = start;
    endTime = stop*1500;
    myAudio.play();
}
});
*/

// Tutorial nav media queries

// function myFunction(mediaNavMediaQuery) {
//   if (mediaNavMediaQuery.matches) { // If media query matches
//       document.documentElement.style.setProperty('--seriesDrawerWidth', '0px');
//   } else {
//       if ($('.sidebar').hasClass('sidebar--open')) document.documentElement.style.setProperty('--seriesDrawerWidth', '0px');
//       else{document.documentElement.style.setProperty('--seriesDrawerWidth', '256px')}
//   }
// }

// var mediaNavMediaQuery = window.matchMedia("(max-width:1024px)")
// myFunction(mediaNavMediaQuery) // Call listener function at run time
// mediaNavMediaQuery.addListener(myFunction) // Attach listener function on state changes

