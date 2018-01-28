import * as React from 'react';
import * as ReactDataGrid from 'react-data-grid';
import { Element, Events, scrollSpy } from 'react-scroll';
import { LogEntry } from '../../../definitions';
import LogEntryView from '../LogEntry';

interface ResultProps {
    logEntries: LogEntry[];
    onViewCommit(entry: LogEntry): void;
    onClick(entry: LogEntry): void;
}

export default class LogEntryList extends React.Component<ResultProps> {
    // private scrolled;
    private ref: HTMLDivElement;
    public componentDidUpdate() {
        // console.log('LogEntryList Component Updated');

        // if (this.scrolled) {
        //   return;
        // }
        // setTimeout(function () {
        //   this.scrolled = true;
        //   console.log('scroll');
        //   scroller.scrollTo('74fde6b00cbf4f2aa796d98a077d52656ade4856', {
        //     duration: 1500,
        //     delay: 100,
        //     smooth: true,
        //     containerId: 'scrollCnt',
        //     offset: 50 // Scrolls to element + 50 pixels down the page
        //   });
        // }, 30000);
    }
    public componentDidMount() {
        // Events.scrollEvent.register('begin', function () {
        //     // tslint:disable-next-line:no-console
        //     console.log('begin', arguments);
        // });

        // Events.scrollEvent.register('end', function () {
        //     console.log('end', arguments);
        // });

        scrollSpy.update();
    }
    public componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }
    public render() {
        if (!Array.isArray(this.props.logEntries)) {
            return null;
        }

        // const results = this.props.logEntries.map(entry =>
        //     <Element name={entry.hash.full} className='myItem' key={entry.hash.full}>
        //         <LogEntryView
        //             key={entry.hash.full}
        //             logEntry={entry}
        //             onViewCommit={this.props.onViewCommit}
        //             onClick={this.props.onClick} />
        //     </Element>
        // );


        // return (
        //     // tslint:disable-next-line:react-this-binding-issue
        //     <div ref={(ref) => this.ref = ref}>
        //         {results}
        //     </div>
        // );


        const rows = this.props.logEntries.map(entry => {
            return {
                id: entry.author.name,
                title: entry.subject,
                count: entry.author.date.toLocaleString()
            };
        });
        // let rows = [];
        // for (let i = 1; i < 1000; i++) {
        //   rows.push({
        //     id: i,
        //     title: 'Title ' + i,
        //     count: i * 1000
        //   });
        // }

        // this._rows = rows;

        const columns = [
            { key: 'id', name: 'Author' },
            { key: 'title', name: 'Message' },
            { key: 'count', name: 'Date' }];

        const style = {
            marginLeft: '0.3em',
            backgroundColor: 'transparent'
        };

        return (
            // tslint:disable-next-line:react-this-binding-issue
            <div ref={(ref) => this.ref = ref}>
                <ReactDataGrid style={style}
                    columns={columns}
                    rowGetter={(i) => rows[i]}
                    rowsCount={rows.length}
                    minHeight={500} />);
            </div>
        );

    }

}
