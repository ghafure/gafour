// Power Query M scripts for the Sales Performance Dashboard.
// Update SalesCsvPath to the local path of data/sales_sample.csv before loading.

let
    SalesCsvPath = "C:\\path\\to\\gafour\\data\\sales_sample.csv",
    Source = Csv.Document(
        File.Contents(SalesCsvPath),
        [Delimiter = ",", Columns = 12, Encoding = 65001, QuoteStyle = QuoteStyle.None]
    ),
    PromotedHeaders = Table.PromoteHeaders(Source, [PromoteAllScalars = true]),
    ChangedTypes = Table.TransformColumnTypes(
        PromotedHeaders,
        {
            {"Date", type date},
            {"Region", type text},
            {"Country", type text},
            {"Segment", type text},
            {"Category", type text},
            {"Product", type text},
            {"Customer", type text},
            {"Sales", Currency.Type},
            {"Cost", Currency.Type},
            {"Units", Int64.Type},
            {"Discount", Percentage.Type},
            {"Channel", type text}
        }
    )
in
    ChangedTypes

// Date table query. Name this query Date and mark it as the date table.
let
    StartDate = #date(2025, 1, 1),
    EndDate = #date(2025, 12, 31),
    DateList = List.Dates(StartDate, Duration.Days(EndDate - StartDate) + 1, #duration(1, 0, 0, 0)),
    DateTable = Table.FromList(DateList, Splitter.SplitByNothing(), {"Date"}),
    ChangedType = Table.TransformColumnTypes(DateTable, {{"Date", type date}}),
    AddedYear = Table.AddColumn(ChangedType, "Year", each Date.Year([Date]), Int64.Type),
    AddedMonthNumber = Table.AddColumn(AddedYear, "Month Number", each Date.Month([Date]), Int64.Type),
    AddedMonth = Table.AddColumn(AddedMonthNumber, "Month", each Date.MonthName([Date]), type text),
    AddedQuarter = Table.AddColumn(AddedMonth, "Quarter", each "Q" & Number.ToText(Date.QuarterOfYear([Date])), type text),
    AddedYearMonth = Table.AddColumn(AddedQuarter, "Year Month", each Date.ToText([Date], "yyyy-MM"), type text)
in
    AddedYearMonth
