import { publish } from 'gh-pages';

publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/KoljanTestwamore/MathCourses.git', // Update to point to your repository  
    },
    () => {
        console.log('Deploy Complete!')
    }
)