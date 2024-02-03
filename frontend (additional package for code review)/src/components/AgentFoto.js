import agentPhotoLogo from '../agentPhoto/Logo.jpg';

import agentPhoto00 from '../agentPhoto/00.png';
import agentPhoto01 from '../agentPhoto/01.jpg';
import agentPhoto03 from '../agentPhoto/03.jpg';
import agentPhoto05 from '../agentPhoto/05.jpg';
import agentPhoto08 from '../agentPhoto/08.jpg';
import agentPhoto09 from '../agentPhoto/09.jpg';
import agentPhoto10 from '../agentPhoto/10.jpg';
import agentPhoto11 from '../agentPhoto/11.jpg';
import agentPhoto12 from '../agentPhoto/12.jpg';
import agentPhoto13 from '../agentPhoto/13.jpg';
import agentPhoto15 from '../agentPhoto/15.jpg';
import agentPhoto16 from '../agentPhoto/16.jpg';
import agentPhoto17 from '../agentPhoto/17.jpg';
import agentPhoto18 from '../agentPhoto/18.jpg';
import agentPhoto19 from '../agentPhoto/19.jpg';
import agentPhoto20 from '../agentPhoto/20.jpg';
import agentPhoto23 from '../agentPhoto/23.jpg';
import agentPhoto24 from '../agentPhoto/24.jpg';
import agentPhoto25 from '../agentPhoto/25.jpg';

function AgentPhoto(props) {

	const agentsPhoto = {
		"Клименко Максим Анатолійович": agentPhoto00,
		"Горай Ольга": agentPhoto01,
		"Карпенко Сергій": agentPhoto03,
		"Мележик Оксана": agentPhoto05,
		"Кочергін Андрій": agentPhoto08,
		"Баландюк Катерина": agentPhoto09,
		"Чумак Олена": agentPhoto10,
		"Гавюк Катерина": agentPhoto11,
		"Леонідова Людмила": agentPhoto12,
		"Прокопюк Катерина": agentPhoto13,
		"Коновалов Максим Васильович": agentPhoto15,
		"Рудник Валентин": agentPhoto16,
		"Бойко Олексій": agentPhoto17,
		"Рахнянська Світлана": agentPhoto18,
		"Слегина Анастасія": agentPhoto19,
		"Куталовська Лариса": agentPhoto20,
		"Колесніков Олександр": agentPhoto23,
		"Боровик Владислава": agentPhoto24,
		"Корхов Олександр": agentPhoto25,
	};

	function agentPhotoFilter() {
		const agentName = props.salesAgentName;
		if (agentsPhoto.hasOwnProperty(agentName)) {
			return agentsPhoto[agentName];
		} else {
			return agentPhotoLogo;
		}
	}

	return (
		<img className='agentFoto' src={agentPhotoFilter()} alt='' />
	);
}

export default AgentPhoto;