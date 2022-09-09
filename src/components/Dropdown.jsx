import React from "react";

function Dropdown(props) {
	const handleChange = (event) => {
		props.changed(event.target.value);
	};

	return (
		<div className="flex py-1">
			<label className="px-1 w-20">{props.label}</label>
			<select
				value={props.selectedValue}
				onChange={handleChange}
				className="text-black w-56"
			>
				<option key={0}>Select...</option>
				{props.options.map((item, idx) => (
					<option key={idx} value={item.id}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	);
}

export default Dropdown;
