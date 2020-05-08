import frz from './frz.jpg';
import style from './index.scss';

function createFrz() {
	var img = new Image();
	img.src = frz;
	img.classList.add(style.frz);

	var root = document.getElementById('root');
	root.append(img);
}

export default createFrz;