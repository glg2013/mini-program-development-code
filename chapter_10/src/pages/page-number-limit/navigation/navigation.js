const pageController = require('../page-controller')

Component({
  attached() {
    this.setData({needBack: getCurrentPages().length !== 1})
  },
  methods: {
    navigateBack() {
      pageController.navigateBack()
    }
  }
});
