const { createApp } = Vue;
import GalleryCard from "./GalleryCard.js";
createApp({
  delimiters: ["[[", "]]"],
  components: {
    GalleryCard,
  },
  data() {
    return {
      isLoading: true,
      stack: [],
      showSubmenu: false,
      submenuHeading: "",
      statusNavBarHovered: false,
      isScrolled: false,
      currentLevel: 1,
      currentItems: [],
      isGoingBack: false,
      navigationData: null,
      activeItem: null,
    };
  },
  computed: {
    itemsWithImages() {
      return this.currentItems.filter(
        (item) => item.image !== null && item.image !== ""
      );
    },
  },
  methods: {
    getNavDataFromWindowObject() {
      const navData = JSON.parse(window.navDataObject);
      this.navigationData = navData.navigationData;
      this.isLoading = false;
    },
    getNavData() {
      // Access the element with the ID 'NavBar' and retrieve the 'data-primary-nav' attribute
      const primaryNavAttribute = document
        .getElementById("NavBar")
        .getAttribute("data-primary-nav");

      // Set the navigationData property based on the retrieved attribute
      this.navigationData = JSON.parse(primaryNavAttribute).navigationData;
      this.isLoading = false;
    },
    getNavBarHeight() {
      const navBar = document.getElementById("NavBar");

      // Create a ResizeObserver
      const resizeObserver = new ResizeObserver(setNavBarHeight);

      // Observe changes in NavBar size
      resizeObserver.observe(navBar);

      // Function to set CSS variable --MsgBarHeight
      function setNavBarHeight() {
        const navBarHeight = navBar.clientHeight;
        document.documentElement.style.setProperty(
          "--NavBarHeight-desktop",
          navBarHeight + "px"
        );
      }
    },
    handleIntersection(entries) {
      this.isScrolled = entries[0].boundingClientRect.y < 0;
    },
    handleNavBarMouseEnter() {
      this.statusNavBarHovered = true;
    },
    handleNavBarMouseLeave() {
      this.showSubmenu = false;
      this.statusNavBarHovered = false;
      this.resetSubmenu();
    },
    handleNavBarSubmenuMouseLeave() {
      // console.log("mouseLeave submenu");
    },
    handleNavBarSubmenuMouseOut() {
      // console.log("mouseOut submenu");
    },
    handleSubmenuOverlayTouch() {
      this.showSubmenu = false;
      this.statusNavBarHovered = false;
      this.resetSubmenu();
    },
    handleSubmenuOverlayMouseOver() {
      this.showSubmenu = false;
      this.statusNavBarHovered = false;
      this.resetSubmenu();
    },
    handlePrimaryNavItemHover(item) {
      this.resetSubmenu();
      if (item.hasChildren) {
        this.submenuHeading = item.navTitle;
        this.currentItems = item.childrenData || [];
        this.showSubmenu = true;
        this.activeItem = item; // Set the active item
      } else {
        this.showSubmenu = false;
        this.activeItem = null; // Reset the active item if no submenu
      }
    },
    handlePrimaryNavItemTouch(item) {
      // console.log("touched?");
    },
    handlePrimaryNavItemClick(item, event) {
      if (!document.documentElement.classList.contains("no-touchevents")) {
        // If the class is not found, prevent the default action
        event.preventDefault();
      }
    },
    navigateToNextLevel(item) {
      this.currentLevel += 1;
      this.stack.push(this.currentItems);
      this.currentItems = item.childrenData || [item];
    },
    navigateToPreviousLevel() {
      if (this.currentLevel > 1) {
        this.currentLevel -= 1;
        this.currentItems = this.stack.pop() || [];
      }
    },
    resetSubmenu() {
      this.submenuHeading = "";
      this.currentLevel = 1;
      this.currentItems = [];
      this.stack = [];
      this.isGoingBack = false;
      this.activeItem = null; // Reset active item when submenu is reset
    },
    isActiveItem(item) {
      return this.activeItem === item;
    },
  },
  created() {
    this.getNavDataFromWindowObject();
  },
  mounted() {
    this.$nextTick(() => {
      this.getNavBarHeight();
      // for debugging to keep menu open
      // this.handlePrimaryNavItemHover(this.navigationData[0]);
    });

    // Create an IntersectionObserver
    const pixelToWatch = document.querySelector("#pixel-to-watch");

    if (pixelToWatch) {
      const observer = new IntersectionObserver(this.handleIntersection);
      observer.observe(pixelToWatch);
    }
  },
}).mount("#NavBar");