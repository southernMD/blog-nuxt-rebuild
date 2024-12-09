export const useSkin = (op:string)=>{
    if(op == 'light'){
        document.getElementsByTagName('body')[0].style.setProperty('--backgroundBtn', `rgba(255, 255, 255, .6)`);
        document.getElementsByTagName('body')[0].style.setProperty('--backgroundModle', `rgba(255, 255, 255, .3)`);
        document.getElementsByTagName('body')[0].style.setProperty('--fontColor', `#666`);
        document.getElementsByTagName('body')[0].style.setProperty('--backgroundColor', `#f4f5f5`);
        document.getElementsByTagName('body')[0].style.setProperty('--backgroundColorOp', `rgba(244, 245, 245,.8)`);
        document.getElementsByTagName('body')[0].style.setProperty('--blockHoverBk', `#E4E7ED`);
        document.getElementsByTagName('body')[0].style.setProperty('--selectColor', `#333333`);
        document.getElementsByTagName('body')[0].style.setProperty('--splitColor', `#222`);
        document.getElementsByTagName('body')[0].style.setProperty('--fontColorHover', `#111`);
        document.getElementsByTagName('body')[0].style.setProperty('--boxShString', `0 0 25px #333`);
        document.getElementsByTagName('body')[0].style.setProperty('--md-color', `#666`);
        document.getElementsByTagName('body')[0].style.setProperty('--titleFontColor', `#333333`);
        document.getElementsByTagName('body')[0].style.setProperty('--fontActiveColor', `#000`);
    }else if(op == 'dark'){
        document.getElementsByTagName('body')[0].style.setProperty('--backgroundBtn', `rgba(0, 0, 0, .6)`);
        document.getElementsByTagName('body')[0].style.setProperty('--backgroundModle', `rgba(0, 0, 0, .3)`);
        document.getElementsByTagName('body')[0].style.setProperty('--fontColor', `#bebebe`);
        document.getElementsByTagName('body')[0].style.setProperty('--backgroundColor', `#333333`);
        document.getElementsByTagName('body')[0].style.setProperty('--backgroundColorOp', `rgba(51, 51, 51,.8)`);
        document.getElementsByTagName('body')[0].style.setProperty('--blockHoverBk', `#31365b`);
        document.getElementsByTagName('body')[0].style.setProperty('--selectColor', `#272c47`);
        document.getElementsByTagName('body')[0].style.setProperty('--splitColor', `#aeaeae`);
        document.getElementsByTagName('body')[0].style.setProperty('--fontColorHover', `#9e9e9e`);
        document.getElementsByTagName('body')[0].style.setProperty('--boxShString', `0 0 25px #f4f5f5`);
        document.getElementsByTagName('body')[0].style.setProperty('--md-color', `#bebebe`);
        document.getElementsByTagName('body')[0].style.setProperty('--titleFontColor', `#fff`);
        document.getElementsByTagName('body')[0].style.setProperty('--fontActiveColor', `#fff`);
    }
}