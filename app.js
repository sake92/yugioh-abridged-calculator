
const animateCSS = (element, animation, durationMillis, prefix = 'animate__') =>
	// We create a Promise and return it
	new Promise((resolve, reject) => {
		const animationName = `${prefix}${animation}`;
		const node = document.querySelector(element);

		let repeat = Math.ceil(durationMillis / 1000);
		node.classList.add(`${prefix}animated`, animationName);
		node.classList.add(`animate__repeat-${repeat}`);
		node.style.setProperty('--animate-duration', '1s');


		// When the animation ends, we clean the classes and resolve the Promise
		function handleAnimationEnd() {
			node.classList.remove(`${prefix}animated`, animationName);
			resolve('Animation ended');
		}

		node.addEventListener('animationend', handleAnimationEnd, { once: true });
	});


const app = new Vue({
	el: '#app',
	data: {
		isPlaying: false,
		phaseAudios: {
			mp: {
				audios: ['de_malo_adza_vidi_karte.mp3', 'azdahas_mog.mp3', 'jebeni_sibirski_plavac.mp3',
					'rizicno_i_sokera.mp3', 'sto_ces_pogines.mp3', 'bacam_kartu.mp3', 'idem_u_coravo.mp3']
			},
			bp: {
				audios: ['sangajski_aligator.mp3', 'zeleni_polubrat.mp3', 'plavi_guster.mp3',
					'spali_ga_prohom.mp3', 'budalo_napad.mp3', 'husein_kapetan.mp3', 'sibirski_plavac.mp3',
					'uzmi_spiceve.mp3', 'nauzvarenim.mp3']
			},
			minus: {
				audios: ['e_jebemu.mp3', 'ogrebotine.mp3']
			}
		},
		p1: {
			lifePoints: 8000,
			tmpPoints: 0
		},

	},
	methods: {
		playPhase(name) {
			const phaseData = this.phaseAudios[name];
			const idx = Math.floor(Math.random() * phaseData.audios.length);
			const fileName = phaseData.audios[idx];
			this.play(`audio/bs/${name}/${fileName}`);
		},
		play(url) {
			if (this.isPlaying) return;
			this.isPlaying = true;
			const audio = new Audio(url);
			audio.play();
			audio.addEventListener('ended', () => this.isPlaying = false);
		},
		addTmp(amount) {
			this.p1.tmpPoints += amount;
		},
		addLP(add) {
			if (this.p1.tmpPoints <= 0 || this.isPlaying) return;

			if (add) this.p1.lifePoints += this.p1.tmpPoints;
			else {
				let remaining = this.p1.tmpPoints;
				while (remaining > 0) {
					remaining -= 1;
					setTimeout(() => {
						this.p1.lifePoints -= 1;
					}, remaining);
				}

				//this.p1.lifePoints -= this.p1.tmpPoints;
				this.playPhase('minus');
			}

			animateCSS('#LPs', 'shakeX', this.p1.tmpPoints);
			this.p1.tmpPoints = 0;
		}
	}
});

