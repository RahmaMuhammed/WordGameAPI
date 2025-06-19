using Microsoft.AspNetCore.Mvc;

namespace WordGameAPI.Controllers
{
    public class Word : Controller
    {
        [HttpGet("api/words")]
        public IActionResult GetWord(string category, string difficulty)
        {
            var words = HelperClass.LoadWords();
            var word = words
           .Where(w => w.category == category && w.difficulty == difficulty)
           .OrderBy(_ => Guid.NewGuid())
           .FirstOrDefault();

            if (word == null)
                return NotFound("No words found.");

            return Ok(new { word = word.word });

        }
    }
}
