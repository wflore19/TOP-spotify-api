import React from "react";

function Detail(props) {
	return (
		<div className="w-80 bg-zinc-900 h-fit">
			<div className="">
				<img src={props.album.images[0].url} alt={props.name} />
			</div>
			<div className="border-slate-100/10 border rounded-sm">
				<div className="px-3 pt-4 text-base w-30 overflow-x-hidden">
					<label
						className="hover:underline cursor-pointer"
						htmlFor={props.name}
					>
						{props.name}
					</label>
				</div>
				<div className="pb-4 text-xs px-3">
					<label
						className="text-white/60 hover:text-white/80 hover:underline cursor-pointer"
						htmlFor={props.artists[0].name}
					>
						{props.artists[0].name}
					</label>
				</div>
			</div>
		</div>
	);
}

export default Detail;
