export default class TextPost {
  constructor() {
    this.parentEl = document.querySelector('.container');
  }

  init() {
    this.drawUI();

    this.form = this.parentEl.querySelector('.form');
    this.addTicket = this.addTicket.bind(this);
    this.input = this.parentEl.querySelector('.form-input');

    this.form.addEventListener('submit', this.addTicket);
  }

  drawUI() {
    const widget = document.createElement('div');
    widget.classList.add('widget-container');
    widget.innerHTML = `
            <div class="list"></div>
            <div class="footer">
                <form class="form">
                    <input class="form-input" name="input" type="text">
                </form>
            </div>`;

    this.parentEl.appendChild(widget);
  }

  addTicket(e) {
    e.preventDefault();
    this.getPosition();
  }

  getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data) => {
          const { latitude, longitude } = data.coords;

          this.showPost(latitude, longitude);
        },
        (err) => {
          this.showModal();
        },

      );
    }
  }

  showPost(latitude, longitude) {
    this.list = this.parentEl.querySelector('.list');
    this.post = document.createElement('div');
    this.post.classList.add('post');
    this.post.innerHTML = `
            <div class="elem">
                <span>${this.input.value}</span>
            </div>
            <div class="date">${new Date().toLocaleString()}</div>
            <div class="geo">[${latitude},${longitude}]</div>
        `;

    this.list.insertAdjacentElement('afterbegin', this.post);
    this.resetInput();
  }

  resetInput() {
    this.input.value = '';
  }

  showModal() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.innerHTML = `
            <div class="modal">
                <h3>Что-то пошло не так</h3>
                <p>Извините, но мы не можем определить ваше местоположение, 
                пожалуйста, дайте нам разрешение на использование геолокации 
                либо введите координаты вручную</p>
                <p>Широта и долгота через запятую</p>
                <form class="modal-form">
                    <input class="modal-input" name="modal" type="text">
                    <div class="btns">
                        <button type="reset" class="reset">Отмена</button>
                        <button type="submit" class="ok">Ok</button>
                    </div>
                </form>
            </div>
        `;

    this.parentEl.appendChild(this.modal);

    this.parentEl.querySelector('.modal-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const modalInput = this.parentEl.querySelector('.modal-input').value;
      let value = this.checkValidity(modalInput);
      if (value) {
        value = value[0].split(',');
        const latitude = value[0].trim();
        const longitude = value[1].trim();

        this.hideModal();
        this.showPost(latitude, longitude);
      } else {
        alert('Координаты введены не верно');
      }
    });

    this.parentEl.querySelector('.modal-form').addEventListener('reset', (e) => {
      e.preventDefault();
      this.hideModal();
    });
  }

  checkValidity(string) {
    return string.match(/^\[?\d+\.\d+,\s?\-?\d+\.\d+\]?$/gm);
  }

  hideModal() {
    this.parentEl.querySelector('.modal').remove();
  }
}
