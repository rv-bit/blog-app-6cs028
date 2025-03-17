"use no memo";

import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingFn, SortingState, useReactTable } from "@tanstack/react-table";
import React from "react";

import { cn } from "@/lib/utils";
import { Price } from "@/types/stripe";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ArrowDown, ArrowUp, ChevronsUpDown, EllipsisVertical } from "lucide-react";

import EditPriceForm from "../forms/edit-price-form";

const sortStatusFn: SortingFn<Price> = (rowA, rowB, _columnId) => {
	const statusA = rowA.original.active ? "Active" : "Inactive";
	const statusB = rowB.original.active ? "Active" : "Inactive";
	const statusOrder = ["Active", "Inactive"];
	return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
};

export default function PricesTable({ prices }: { prices: Price[] }) {
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const columns = React.useMemo<ColumnDef<Price>[]>(
		() => [
			{
				accessorKey: "id",
				header: "Price Id",
			},
			{
				accessorKey: "product",
				header: "Product Id",
			},

			{
				accessorKey: "type",
				header: "Type",
			},
			{
				accessorKey: "billing_scheme",
				header: "Billing Scheme",
			},
			{
				accessorKey: "active",
				header: ({ column }) => {
					return (
						<div className="flex items-center justify-center gap-1">
							<Button
								variant={"link"}
								size={"sm"}
								className="flex items-center justify-center has-[>svg]:px-0"
								onClick={() => {
									column.toggleSorting(column.getIsSorted() === "asc");
								}}
							>
								<h1 className="text-muted-foreground text-center">Status</h1>
								{column.getIsSorted() === "desc" ? (
									<ArrowDown className="size-auto" size={14} />
								) : column.getIsSorted() === "asc" ? (
									<ArrowUp className="size-auto" size={14} />
								) : (
									<ChevronsUpDown className="size-auto" size={14} />
								)}
							</Button>
						</div>
					);
				},
				cell: ({ row }) => {
					const isActive = row.original.active ? "Active" : "Inactive";

					return (
						<span
							className={cn("flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-800", {
								"bg-green-100 text-green-800": row.original.active,
								"bg-red-100 text-red-800": !row.original.active,
							})}
						>
							{isActive}
						</span>
					);
				},
			},
			{
				accessorKey: "actions",
				sortingFn: sortStatusFn,
				header: ({ column }) => {
					return <div className="text-right">Actions</div>;
				},
				cell: ({ row }) => {
					return (
						<Sheet>
							<div className="flex items-center justify-end space-x-2 pr-0">
								<SheetTrigger asChild>
									<Button variant={"link"} size={"sm"} className="p0 p-0 has-[>svg]:px-0">
										<EllipsisVertical />
									</Button>
								</SheetTrigger>
							</div>
							<SheetContent className="w-full rounded-tl-sm rounded-bl-sm sm:max-w-5xl">
								<SheetHeader className="flex flex-col items-start justify-start gap-0 border-b border-gray-200">
									<SheetTitle className="text-left text-lg font-medium text-gray-900 dark:text-gray-100">Editing Price Data</SheetTitle>
									<SheetDescription className="text-left text-sm text-gray-600 dark:text-gray-400">Edit the price data below.</SheetDescription>
								</SheetHeader>
								<EditPriceForm currentData={row.original} />
							</SheetContent>
						</Sheet>
					);
				},
			},
		],
		[],
	);

	const table = useReactTable({
		data: prices,
		columns,
		debugTable: true,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	return (
		<div className="flex max-h-96 flex-col gap-3 overflow-auto bg-white p-5 shadow-sm">
			<header>
				<h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Prices</h2>
				<p className="mt-1 text-sm text-gray-600 dark:text-gray-400"> Manage prices for your products.</p>
			</header>

			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
