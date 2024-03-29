import egor from '../assets/photo/egor.jpg';
import victor from '../assets/photo/victor.jpg';
import oleg from '../assets/photo/oleg.jpg';
export const CENTS_PER_EURO = 100;
export const FIRST_INDEX = 0;
export const PRODUCTS_IN_PAGE = 9;
export const POPULAR_PRODUCTS_IN_PAGE = 4;

export const teamMembers = [
  {
    id: 0,
    name: 'Егор',
    role: 'Тим Лид / Full-stack Developer',
    bio: ` Физик. Инженер, завершил своё образование в престижном Гомельском государственном университете имени Ф. Скорины. Провёл более 10 лет в мире продаж. Его способность убеждать и находить общий язык с людьми позволили ему выделяться среди коллег и достичь впечатляющих результатов. Этот опыт сделал его умелым в общении и решении сложных ситуаций. \n Активно занимается парашютным спортом и сноутбордом\n\nЕгор - тим лид нашей команды разработчиков. Он обладает богатым опытом в разработке и координации проектов. Егор активно участвовал в создании успешного продукта и руководил всей командой. 
    \n Также внес значительный вклад в проект: реализовал cтраницу About, создал страницу с подробным описанием продукта, следил за доской Github`,
    githubProfile: 'https://github.com/egorca6',
    photo: egor,
  },
  {
    id: 1,
    name: 'Олег',
    role: 'Senior Developer',
    bio: `Олег - опытный Senior Developer в нашей команде. Он сделал значительный вклад в проект, ответственный за множество ключевых задач, включая настройку окружения разработки, основную страницу и маршрутизацию, а также валидацию ввода на странице входа и многое другое. 
    \n Кроме того, Олег разработал дизайн сайта, придавая проекту визуальную привлекательность и удобство использования. Он также активно участвовал в разрешении конфликтов в Пулл-реквестах и следил за высоким качеством кода, гарантируя, что разработка проходит согласно стандартам и требованиям команды.`,
    githubProfile: '../../assets/404.png',
    photo: oleg,
  },
  {
    id: 2,
    name: 'Виктор',
    role: 'Full-stack Developer',
    bio: `Военный летчик (ОВВАКУЛ). Инженер конструктор самолетостроение (МАИ). Ведущий инженер САПР (Брестский завод газовой аппаратуры). Директор строительной фирмы. Фотограф (фрилансер). Отец 2 детей и дед 4 внуков – они мое главное достижение в жизни. \n\n  Виктор - опытный Full-stack Developer, который внес существенный вклад в наш проект. Он отвечал, реализацию страницы корзины, а также интеграцию с данными пользовательских профилей. \nДля меня написание кода такое же азартное занятие как игра в казино, с той лишь разницей, что ставку делаешь не на слепой случай, а на свои знания и упорный труд.`,
    githubProfile: 'https://github.com/VOLSVIK/rsschool-cv',
    photo: victor,
  },
];
