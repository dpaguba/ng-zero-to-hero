import { Directive, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

const PAGE_SIZE_KEY = 'pagination_page_size';

@Directive({
    selector: '[mPaginationItemsPerPage]'
})
export class MPaginationItemsPerPageDirective implements OnInit {
    private element: MatPaginator;

    get pageSize() {
      return JSON.parse(localStorage.getItem(PAGE_SIZE_KEY) || '{}');
        // return parseInt(localStorage.getItem(PAGE_SIZE_KEY), 10);
    }

    set pageSize(size: number) {
        localStorage.setItem(PAGE_SIZE_KEY, '' + size);
    }

    constructor(private el: MatPaginator) {
        this.element = el;
    }

    ngOnInit(): void {
        this.element.pageSize = this.pageSize;

        this.element.page.subscribe((page: PageEvent) => {
            this.pageSize = page.pageSize;
        });
    }
}