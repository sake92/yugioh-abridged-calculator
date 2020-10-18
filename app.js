
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
				'uzmi_spiceve.mp3']
			}
		}
	},
	methods: {
		playPhase(name) {
			const phaseData = this.phaseAudios[name];
			const idx = Math.floor(Math.random() * phaseData.audios.length);
			const fileName = phaseData.audios[idx];
			this.play(`audio/bs/${fileName}`);
		},
		play(url) {
			if (this.isPlaying) return;
			this.isPlaying = true;
			const audio = new Audio(url);
			audio.play();
			audio.addEventListener('ended', () => this.isPlaying = false);
		}
	}
});

