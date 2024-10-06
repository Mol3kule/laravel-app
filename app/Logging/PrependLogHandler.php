<?php

namespace App\Logging;

use Monolog\Handler\StreamHandler;
use Monolog\Level;
use Monolog\LogRecord;

class PrependLogHandler extends StreamHandler
{
    public function __construct(string $path, $level = Level::Debug, bool $bubble = true)
    {
        parent::__construct($path, $level, $bubble);
    }

    /**
     * @param LogRecord $record
     * @return void
     */
    public function write(LogRecord $record): void
    {
        // Get the existing logs, handling the case when the file might not exist yet
        $existingLogs = file_exists($this->url) ? file_get_contents($this->url) : '';

        // Create new log entry.
        $newLogEntry = $this->getFormatter()->format($record);

        // Prepend the new log entry
        file_put_contents($this->url, $newLogEntry . PHP_EOL . $existingLogs);
    }
}
