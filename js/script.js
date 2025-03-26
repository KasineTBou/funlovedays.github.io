document.addEventListener('DOMContentLoaded', function() {
    // ----------------------------------------------------------------------
    // Код для галереи (воспроизведение музыки и слайдшоу)
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentAudio = null;
    let slideshowOverlay = null;
    let currentSlideIndex = 0;
    let slideshowImages = [];

    function playMusic(musicFile) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        if (musicFile) {
            currentAudio = new Audio(musicFile);
            currentAudio.play();
        }
    }

    function createSlideshowOverlay() {
        slideshowOverlay = document.createElement('div');
        slideshowOverlay.classList.add('slideshow-overlay');
        document.body.appendChild(slideshowOverlay);

        const img = document.createElement('img');
        slideshowOverlay.appendChild(img);

        return { overlay: slideshowOverlay, img: img };
    }

    function showImage(index) {
        if (slideshowOverlay && slideshowOverlay.img && slideshowImages[index]) {
            slideshowOverlay.img.src = slideshowImages[index];
        }
    }

    function startSlideshow(startElement) {
        const { overlay, img } = createSlideshowOverlay();

        slideshowImages = [];
        for (let i = 1; i <= 5; i++) {
            slideshowImages.push(`img/Photo-${i}.jpg`);
        }

        currentSlideIndex = 0;
        showImage(currentSlideIndex);

        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % slideshowImages.length;
            showImage(currentSlideIndex);
        }

        overlay.addEventListener('click', function(event) {
            nextSlide();
        });
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const musicFile = this.dataset.music;
            playMusic(musicFile);

            if (this.dataset.slideshow !== undefined) {
                startSlideshow(this);
            }
        });
    });

    // Код для пасхалки
    const easterEggTrigger = document.querySelector('.easter-egg-trigger');
    const easterEggContent = document.querySelector('.easter-egg-content');

    if (easterEggTrigger && easterEggContent) {
        easterEggTrigger.addEventListener('click', function() {
            easterEggContent.classList.toggle('visible');

            // Воспроизведение музыки
            const musicFile = this.dataset.music;
            playMusic(musicFile); // Вызываем функцию playMusic
        });
    }

    // ----------------------------------------------------------------------
    // Код для создания падающих поцелуев
    const kissesContainer = document.querySelector('.kisses');

    function createKiss() {
        const kiss = document.createElement('span');
        kiss.classList.add('kiss');
        kiss.style.left = Math.random() * 100 + 'vw';
        kiss.style.animationDuration = Math.random() * 2 + 3 + 's';
        kiss.innerText = '💋';
        kissesContainer.appendChild(kiss);

        kiss.addEventListener('animationend', () => {
            kiss.remove();
        });
    }

    setInterval(createKiss, 300);
});