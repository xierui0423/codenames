import main from './main.vue';
import landing from '../../components/landing/landing.vue';
import board from '../../components/board/board.vue';
import teamlead from '../../components/teamlead/teamlead.vue';


export default [{
  path: '/',
  component: main,
  children: [
    {
      path: '/',
      component: landing,
    },
    {
      path: 'landing',
      component: landing,
    },
    {
      path: 'board',
      component: board,
    },
    {
      path: 'teamlead',
      component: teamlead,
    },
  ],
}];
