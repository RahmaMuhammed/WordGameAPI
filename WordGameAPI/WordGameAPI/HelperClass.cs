using CsvHelper;
using System.Collections.Generic;
using System.Globalization;

namespace WordGameAPI
{
    public class HelperClass
    {
        // Method to load words from CSV file
        public static List<Word>  LoadWords()
        {
            // Path to CSV file in "Data" folder
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "word_dataset.csv");

            // Open the file to read data
            using var reader = new StreamReader(filePath);

            // Prepare CsvHelper for reading
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

            // Read CSV data into a list of Word objects
            var records = csv.GetRecords<Word>().ToList();

            // Return the loaded words
            return records;
        }
    }
}
