"use client"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

import {
    Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";



export default function LinksTable() {
    const links = [{ id: 1, name: "Link 1", link: "https://example.com", viewCount: 100 }, { id: 2, name: "Link 2", link: "https://example.com", viewCount: 200 }] // these are link objects, we'll get there later

    return (
        <div className="w-full sm:p-4">
            <h2 className="p-4">All links</h2>
            <div className="rounded-md sm:border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-medium">Name</TableHead>
                            <TableHead className="font-medium">Link</TableHead>
                            <TableHead className="font-medium">Views</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {links ? (
                            links.map((link) => (
                                <Collapsible key={link.id} asChild>
                                    <>
                                        <TableRow>
                                            <TableCell>{link.name}</TableCell>
                                            <TableCell>{link.id}</TableCell>
                                            <TableCell>{link.viewCount}
                                                <CollapsibleTrigger asChild>
                                                    <div>{link.viewCount}</div>
                                                </CollapsibleTrigger>
                                            </TableCell>
                                        </TableRow>
                                        <CollapsibleContent asChild>
                                            gghjghj
                                        </CollapsibleContent>
                                    </>
                                </Collapsible>
                            ))
                        ) : null}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}