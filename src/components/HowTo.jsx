import React from 'react';
import icon1 from '../assets/ellipse-red.svg';
import icon2 from '../assets/ellipse-yell.svg';
import icon3 from '../assets/ellipse-pur.svg';
import icon4 from '../assets/ellipse-grenn.svg';

const HowTo = () => {
	return (
		<div className="md:px-[136px] min-[240px]:px-4 min-[240px]:mt-16 md:mt-[101px]">
			<div className="mb-10">
				<h4 className="font-semibold text-2xl mb-[16px]">Langkah Pencegahan</h4>
				<p>Gimana sih cara mencegah tuberkulosis?</p>
			</div>
			<div className="flex md:flex-row min-[240px]:flex-col min-[240px]:gap-4 md:gap-14">
				<div className="card md:w-[268px] md:h-[216px] bg-white card-bordered border-[#D0D0D0] rounded-lg">
					<div className="space-y-4 px-6 py-6">
						<img src={icon1} className="w-8" alt="" />
						<h4 className=" text-base font-bold">Vaksinasi BCG</h4>
						<p className=" text-sm">Vaksin BCG (Bacillus Calmette-Guérin) merupakan vaksin yang digunakan untuk mencegah tuberkulosis.</p>
					</div>
				</div>
				<div className="card md:w-[268px] md:h-[216px] bg-white card-bordered border-[#D0D0D0] rounded-lg">
					<div className="space-y-4 px-6 py-6">
						<img src={icon2} className="w-8" alt="" />
						<h4 className=" text-base font-bold">Hindari kontak</h4>
						<p className=" text-sm">Usahakan untuk menjaga jarak dengan orang yang diketahui menderita TB aktif</p>
					</div>
				</div>
				<div className="card md:w-[268px] md:h-[216px] bg-white card-bordered border-[#D0D0D0] rounded-lg">
					<div className="space-y-4 px-6 py-6">
						<img src={icon3} className="w-8" alt="" />
						<h4 className=" text-base font-bold">Menggunakan masker</h4>
						<p className=" text-sm">Jika anda tinggal di daerah dengan tingkat kejadian TB yang tinggi, disarankan untuk menggunakan masker</p>
					</div>
				</div>
				<div className="card md:w-[268px] md:h-[216px] bg-white card-bordered border-[#D0D0D0] rounded-lg">
					<div className="space-y-4 px-6 py-6">
						<img src={icon4} className="w-8" alt="" />
						<h4 className=" text-base font-bold">Menjaga kebersihan</h4>
						<p className=" text-sm">Cuci tangan dengan sabun dan air bersih secara teratur, terutama setelah berinteraksi dengan penderita TB.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HowTo;
