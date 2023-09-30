import { classNames } from '../utils/classNames'

const styles = {
    wrapper: 'relative pb-8',
    verticalLine: 'absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200',
    container: 'relative flex space-x-3',
    iconContainer: 'flex h-8 w-8 items-center justify-center rounded-full',
    icon: 'h-5 w-5 text-white',
    phaseContainer: 'flex justify-between space-x-10 pt-1.5',
    phaseTitle: 'text-sm text-gray-300',
    phaseTime: 'whitespace-nowrap text-right text-sm text-gray-200',
}

const Timeline = ({ index, timeline, isLastTimeline }) => {
    return (
        <li className={styles.wrapper}>
            {!isLastTimeline && <span className={styles.verticalLine} />}
            <div className={styles.container}>
                <div>
                    <span className={classNames(timeline.iconBackground, styles.iconContainer)}>
                        <timeline.icon className={styles.icon} />
                    </span>
                </div>
                <div className={styles.phaseContainer}>
                    <p className={styles.phaseTitle}>Phase {index + 1}</p>
                    <p className={styles.phaseTime}>{new Date(timeline.startTime).toDateString()}</p>
                </div>
            </div>
        </li>
    )
}

export default Timeline
