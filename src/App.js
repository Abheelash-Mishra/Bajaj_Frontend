import React, { useState } from "react";
import axios from 'axios';
import Select from "react-select";

const App = () => {
	const [input, setInput] = useState('');
	const [error, setError] = useState('');
	const [response, setResponse] = useState(null);
	const [selectedOptions, setSelectedOptions] = useState([]);

	const options = [
		{ value: 'alphabets', label: 'Alphabets' },
		{ value: 'numbers', label: 'Numbers' },
		{ value: 'highest_alphabet', label: 'Highest alphabet' }
	];

	const handleInputChange = (e) => {
		setInput(e.target.value);
		setResponse(null);
		setSelectedOptions([]);
		setError('');
	};

	const handleSubmit = async () => {
		try {
			const parsedInput = JSON.parse(input);
			if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
				throw new Error('Invalid JSON format');
			}

			const res = await axios.post('https://bajaj-backend-myao6svy8-abheelash-mishras-projects.vercel.app/bfhl', parsedInput);
			setResponse(res.data);
			console.log(res.data);
		} catch (err) {
			setError('Invalid JSON format!');
		}
	};

	const handleSelectChange = (selected) => {
		const values = selected.map(option => option.value);
		setSelectedOptions(values);
		console.log(values);
	};


	return (
		<div className={ "h-[80vh] flex flex-col items-center justify-center" }>

			<div className={ "w-1/2 flex flex-col items-center" }>
				<label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
				<textarea
					id="message"
					value={input}
					onChange={handleInputChange}
					rows="8"
					className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Enter the JSON data here..."
				/>

				<button
					type="button"
					className="text-white w-full mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>

			{error &&
				<div className="w-1/2 text-xl">
					<span className={"text-red-600 font-bold"}>ERROR: </span>{error}
				</div>
			}

			{response && (
				<div className={"w-1/2 mt-10"}>
					<h3 className={"text-3xl font-bold mb-4"}>Filtered Responses</h3>
					<Select
						isMulti
						options={ options }
						onChange={ handleSelectChange }
					/>

					<div className="response">
						{ selectedOptions.includes('alphabets') && (
							<h2 className={"text-lg my-2"}>
								<strong>Alphabets:</strong> { JSON.stringify(response.alphabets) }
							</h2>
						) }
						{ selectedOptions.includes('numbers') && (
							<h2 className={ "text-lg my-2" }>
								<strong>Numbers:</strong> { JSON.stringify(response.numbers) }
							</h2>
						) }
						{ selectedOptions.includes('highest_alphabet') && (
							<h2 className={ "text-lg my-2" }>
								<strong>Highest Alphabet:</strong> { JSON.stringify(response.highest_alphabet) }
							</h2>
						) }
					</div>
				</div>
			) }
		</div>

	);
};

export default App;
