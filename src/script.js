document.addEventListener('DOMContentLoaded', function () {
    const imageInput = document.getElementById('imageInput');
    const imageDisplay = document.getElementById('imageDisplay');
    const addImageButton = document.getElementById('addImageButton');
    const saveImageButton = document.getElementById('saveImageButton');
    const saturationRange = document.getElementById('saturation');
    const brightnessRange = document.getElementById('brightness');
    const grayscaleCheckbox = document.getElementById('grayscale');
    const inversionCheckbox = document.getElementById('inversion');
    const resetFiltersButton = document.getElementById('resetFilters');
    const rotateLeftIcon = document.getElementById('rotate-left');
    const rotateRightIcon = document.getElementById('rotate-right');
    const flipHorizontalIcon = document.getElementById('flip-horizontal');
    const flipVerticalIcon = document.getElementById('flip-vertical');

    addImageButton.addEventListener('click', function () {
        imageInput.click();
    });

    imageInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageDisplay.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    saveImageButton.addEventListener('click', function () {
        saveImage();
    });

    saturationRange.addEventListener('input', function () {
        applyFilters();
    });

    brightnessRange.addEventListener('input', function () {
        applyFilters();
    });

    grayscaleCheckbox.addEventListener('change', function () {
        applyFilters();
    });

    inversionCheckbox.addEventListener('change', function () {
        applyFilters();
    });

    resetFiltersButton.addEventListener('click', function () {
        resetFilters();
    });

    rotateLeftIcon.addEventListener('click', function () {
        rotateImage(-90);
    });

    rotateRightIcon.addEventListener('click', function () {
        rotateImage(90);
    });

    flipHorizontalIcon.addEventListener('click', function () {
        flipImage('horizontal');
    });

    flipVerticalIcon.addEventListener('click', function () {
        flipImage('vertical');
    });

    function applyFilters() {
        const saturationValue = saturationRange.value;
        const brightnessValue = brightnessRange.value;
        const grayscale = grayscaleCheckbox.checked;
        const inversion = inversionCheckbox.checked;

        // Apply filters to the imageDisplay.src
        imageDisplay.style.filter = `saturate(${saturationValue}%) brightness(${brightnessValue}%) ${grayscale ? 'grayscale(100%)' : ''} ${inversion ? 'invert(100%)' : ''}`;
    }

    function resetFilters() {
        saturationRange.value = 100;
        brightnessRange.value = 100;
        grayscaleCheckbox.checked = false;
        inversionCheckbox.checked = false;

        // Reset filters on the imageDisplay.src
        imageDisplay.style.filter = 'none';
    }

    function rotateImage(degrees) {
        // Rotate the image by the specified degrees
        const currentRotation = (parseInt(imageDisplay.dataset.rotation) || 0) + degrees;
        imageDisplay.style.transform = `rotate(${currentRotation}deg)`;
        imageDisplay.dataset.rotation = currentRotation;
    }

    function flipImage(direction) {
        // Flip the image horizontally or vertically
        const currentScaleX = direction === 'horizontal' ? -1 : 1;
        const currentScaleY = direction === 'vertical' ? -1 : 1;
        imageDisplay.style.transform = `scaleX(${currentScaleX}) scaleY(${currentScaleY})`;
    }

    function saveImage() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = imageDisplay.width;
        canvas.height = imageDisplay.height;

        // Draw the image with applied filters onto the canvas
        context.filter = window.getComputedStyle(imageDisplay).filter;
        context.drawImage(imageDisplay, 0, 0, canvas.width, canvas.height);

        // Convert canvas content to data URL
        const dataURL = canvas.toDataURL('image/png');

        // Create a download link
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'edited_image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});
