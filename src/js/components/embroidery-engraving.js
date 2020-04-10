import Axios from "axios";

let productLineItem = new Vue({
    el: '.line-item',
    delimiters: ['${', '}'],
    data: {
        firstline: '',
        secondline: '',
        embroiderPosition: 'Left',
        isEmbroideryForm: true,

        selectedVariation: '',
    },
    methods: {
        onTreadColorChange() {
            let textColor = document.querySelector('#thr-embroidery-text-color');
            let firstlineEl = document.querySelector('#thr-embroidery-firstline');
            let secondlineEl = document.querySelector('#thr-embroidery-secondline');

            let firstlineOutput = document.querySelector('.firstlineOutput');
            let secondlineOutput = document.querySelector('.secondlineOutput');

            console.log(firstlineEl);
            console.log(secondlineEl);
            
            if(textColor.value !== '') {
                firstlineEl.style.color = textColor.value;
                secondlineEl.style.color = textColor.value;

                firstlineOutput.style.color = textColor.value;
                secondlineOutput.style.color = textColor.value;

            }
        },

        onFontChange() {
            let thrFont = document.querySelector('#thr-embroidery-font');
            let firstlineEl = document.querySelector('#thr-embroidery-firstline');
            let secondlineEl = document.querySelector('#thr-embroidery-secondline');

            let firstlineOutput = document.querySelector('.firstlineOutput');
            let secondlineOutput = document.querySelector('.secondlineOutput');

            if(thrFont.value !== '') {
                firstlineEl.style.fontFamily = thrFont.value;
                secondlineEl.style.fontFamily = thrFont.value;

                firstlineOutput.style.fontFamily = thrFont.value;
                secondlineOutput.style.fontFamily = thrFont.value;

            }
        },



        embroiderSave() {
            let embroideryLogo = document.querySelector('#embroideryLogo');
            let embroideryName = document.querySelector('#thr-embroidery-firstline');
            let embroideryDesignation = document.querySelector('#thr-embroidery-secondline');
            
            if(embroideryLogo.files.length != 0) {
                if(embroideryName.value.length > 0 || embroideryDesignation.value.length > 0) {
                    this.selectedVariation = '12528927178869';
                    axios.post('https://www.shopscrubsandclogs.com/cart/add.js', {id: this.selectedVariation, quantity: 1})
                    .then( response => {
                        console.log(response);
                        this.isEmbroideryForm = !this.isEmbroideryForm;
                    })
                    .catch( error => {
                        console.log(error);
                    });
                }else {
                    this.selectedVariation = '12528927080565';
                    axios.post('https://www.shopscrubsandclogs.com/cart/add.js', {id: this.selectedVariation, quantity: 1})
                    .then( response => {
                        console.log(response);
                        this.isEmbroideryForm = !this.isEmbroideryForm;
                    })
                    .catch( error => {
                        console.log(error);
                    });
                }
            } else if(embroideryName.value.length > 0 && embroideryDesignation.value.length > 0) {
                this.selectedVariation = '12528927047797';
                axios.post('https://www.shopscrubsandclogs.com/cart/add.js', {id: this.selectedVariation, quantity: 1})
                .then( response => {
                    console.log(response);
                    this.isEmbroideryForm = !this.isEmbroideryForm;
                })
                .catch( error => {
                    console.log(error);
                });

            } else if(embroideryName.value.length > 0 || embroideryDesignation.value.length > 0 ) {
                this.selectedVariation = '12528927015029';
                axios.post('https://www.shopscrubsandclogs.com/cart/add.js', {id: this.selectedVariation, quantity: 1})
                .then( response => {
                    console.log(response);
                    this.isEmbroideryForm = !this.isEmbroideryForm;
                })
                .catch( error => {
                    console.log(error);
                });

            } else if(embroideryLogo.files.length < 1 &&  embroideryDesignation.value.length < 1) {
                console.log('====================================');
                console.log('None');
                this.selectedVariation = '';

                console.log('====================================');
            }

        
            // axios.post('https://www.shopscrubsandclogs.com/cart/add.js', {id: 31739390296173, quantity: 1})
            // .then( response => {
            //     console.log(response);
            //     this.isEmbroideryForm = !this.isEmbroideryForm;
            // })
            // .catch( error => {
            //     console.log(error);
            // });
        },

        embroideryClose() {
            console.log(this.selectedVariation.length);
            
            if(this.selectedVariation.length > 0) {
                axios.post('https://www.shopscrubsandclogs.com/cart/update.js', 'updates['+ this.selectedVariation +']=0')
                .then( response => {
                    console.log(response);
                    this.isEmbroideryForm = !this.isEmbroideryForm;
                })
                .catch( error => {
                    console.log(error);
                });
            }
        }
    }
});


let productTubeEngraving = new Vue({
    el: '#thr-steth-tube-engraving',
    delimiters: ['${', '}'],
    data: {
        tubeEngravingLine: '',
        isEngravingForm: true,
    },
    methods: {
        onTreadColorChange() {
            // let textColor = document.querySelector('#thr-embroidery-text-color');
            // let firstlineEl = document.querySelector('#thr-embroidery-firstline');
            // let secondlineEl = document.querySelector('#thr-embroidery-secondline');

            // let firstlineOutput = document.querySelector('.firstlineOutput');
            // let secondlineOutput = document.querySelector('.secondlineOutput');

            // console.log(firstlineEl);
            // console.log(secondlineEl);
            
            // if(textColor.value !== '') {
            //     firstlineEl.style.color = textColor.value;
            //     secondlineEl.style.color = textColor.value;

            //     firstlineOutput.style.color = textColor.value;
            //     secondlineOutput.style.color = textColor.value;

            // }
        },

        onFontChange() {
            // let thrFont = document.querySelector('#thr-embroidery-font');
            // let firstlineEl = document.querySelector('#thr-embroidery-firstline');
            // let secondlineEl = document.querySelector('#thr-embroidery-secondline');

            // let firstlineOutput = document.querySelector('.firstlineOutput');
            // let secondlineOutput = document.querySelector('.secondlineOutput');

            // if(thrFont.value !== '') {
            //     firstlineEl.style.fontFamily = thrFont.value;
            //     secondlineEl.style.fontFamily = thrFont.value;

            //     firstlineOutput.style.fontFamily = thrFont.value;
            //     secondlineOutput.style.fontFamily = thrFont.value;

            // }
        },

        engravingSave() {
            alert('Saving the details');
            let engravingName = document.querySelector('#thr-engraving-name');
            
            axios.post('https://www.shopscrubsandclogs.com/cart/add.js', {id: 31739390296173, quantity: 1})
            .then( response => {
                console.log(response);
                this.isEngravingForm = !this.isEngravingForm;
            })
            .catch( error => {
                console.log(error);
            });
             
        },

        engravingClose() {  
                axios.post('https://www.shopscrubsandclogs.com/cart/update.js', 'updates['+ 31739390296173 +']=0')
                .then( response => {
                    console.log(response);
                    this.isEngravingForm = !this.isEngravingForm;
                })
                .catch( error => {
                    console.log(error);
                });
        }

    }
});