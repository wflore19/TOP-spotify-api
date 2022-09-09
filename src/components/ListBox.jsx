import React from "react";

function ListBox(props) {
	const clicked = (event) => {
		event.preventDefault();
		props.clicked(event.target.id);
	};

	return (
		<div className="flex-col flex w-52">
			<div>
				{props.items.map((item, idx) => {
					return (
						<button
							key={idx}
							id={item.track.id}
							onClick={clicked}
							className="text-white py-2 text-start overflow-hidden w-52 hover:bg-gray-600/10 px-1 focus:bg-gray-600/50 rounded"
						>
							{item.track.name}
							<div className="text-white/60 text-sm hover:underline hover:cursor-pointer w-fit hover:text-white/80">
								{item.track.artists[0].name}
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default ListBox;
